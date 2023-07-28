// Import required React hooks and components from external modules
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  // Extract the "id" from the URL using the "useParams" hook
  const { id: productId } = useParams();

  // Define states to store product details for editing
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  // Fetch the product details using the "useGetProductDetailsQuery" hook
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // Define mutation hooks to update product details and upload product images
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  // Get the navigation function from "react-router-dom" to redirect after updating the product
  const navigate = useNavigate();

  // Handler to submit the updated product details
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Call the "updateProduct" mutation to update the product details
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      // Show a success toast and refetch the updated product data
      toast.success('Product updated');
      refetch();
      // Navigate back to the product list page in the admin interface
      navigate('/admin/productlist');
    } catch (err) {
      // Show an error toast if there's an issue with the update
      toast.error(err?.data?.message || err.error);
    }
  };

  // Populate the component state with fetched product details on initial render
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  // Handler to upload the selected product image
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      // Call the "uploadProductImage" mutation to upload the image
      const res = await uploadProductImage(formData).unwrap();
      // Show a success toast and update the component state with the new image URL
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      // Show an error toast if there's an issue with the image upload
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {/* Link to navigate back to the product list page */}
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      {/* Container for the product edit form */}
      <FormContainer>
        <h1>Edit Product</h1>
        {/* Show a loader while updating the product */}
        {loadingUpdate && <Loader />}
        {/* Check if the product data is being fetched */}
        {isLoading ? (
          <Loader /> // Show a loader while fetching the product data
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message> // Show an error message if there's an error fetching the product data
        ) : (
          // Render the product edit form
          <Form onSubmit={submitHandler}>
            {/* Form fields to edit product details */}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {/* Other form fields omitted for brevity */}

            {/* File input to upload a new product image */}
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {/* Show a loader while uploading the product image */}
              {loadingUpload && <Loader />}
            </Form.Group>

            {/* Submit button to update the product */}
            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
