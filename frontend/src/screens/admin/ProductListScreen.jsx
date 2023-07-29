// Import required modules, components, hooks, and icons
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  // Extract the "pageNumber" from the URL using the "useParams" hook
  const { pageNumber } = useParams();

  // Fetch products data using the "useGetProductsQuery" hook
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  // Define mutation hooks to delete and create products
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // Handler to delete a product
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        // Call the "deleteProduct" mutation to delete the product
        await deleteProduct(id);
        refetch();
      } catch (err) {
        // Show an error toast if there's an issue with the delete
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  // Handler to create a new product
  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        // Call the "createProduct" mutation to create a new product
        await createProduct();
        refetch();
      } catch (err) {
        // Show an error toast if there's an issue with the create
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {/* Row to display page title and create product button */}
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          {/* Button to create a new product */}
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>

      {/* Show loaders while creating or deleting products */}
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {/* Check if products data is being fetched */}
      {isLoading ? (
        <Loader /> // Show a loader while fetching the products data
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message> // Show an error message if there's an error fetching the products data
      ) : (
        <>
          {/* Table to display products list */}
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Map through each product and display its details */}
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {/* LinkContainer wraps the edit button to provide a link to edit a product */}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    {/* Button to delete a product */}
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination component to navigate between pages */}
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
