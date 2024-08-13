import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  VStack,
  Select,
  HStack,
  Box,
  useToast,
  Stack
} from '@chakra-ui/react';
import axios from 'axios';

const UpdateEmployee = ({ employee, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    if (employee) {
      setName(employee.name || '');
      setEmail(employee.email || '');
      setPhoneNumber(employee.phoneNumber || '');
      setDesignation(employee.designation || '');
      setGender(employee.gender || '');
      setCourse(employee.course || []);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (course.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one course.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('designation', designation);
    formData.append('gender', gender);
    formData.append('course', course);
    if (image) formData.append('image', image);

    try {
      await axios.put(`https://dealsdray-admin.onrender.com/${employee._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Employee updated.',
        description: 'The employee was updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      location.reload();
      onClose(); 
    } catch (error) {
        let errorMessage = 'An error occurred.';

        if (error.response) {
          const data = error.response.data;
          if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            errorMessage = data.errors[0];
          } else if (data.message) {
            errorMessage = data.message;
          }
        }
      toast({
        title: 'Error.',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" bg={'#fdfcf8'}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} align="flex-start">
          <FormControl isRequired>
            <FormLabel fontSize={'large'}>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              border='1.6px solid #ccc'
              outline={0}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={'large'}>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              border='1.6px solid #ccc' 
              outline={0}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={'large'}>Mobile No</FormLabel>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              border='1.6px solid #ccc' 
              outline={0}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={'large'}>Designation</FormLabel>
            <Select
              placeholder="Select designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              border='1.6px solid #ccc'
            >
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
              <option value="Sales">Sales</option>
              <option value="Developer">Developer</option>
              <option value="UI/UX">UI/UX</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontSize={'large'}>Gender</FormLabel>
            <RadioGroup onChange={setGender} value={gender}>
              <HStack spacing={4}>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
                <Radio value="Other">Other</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>
          <FormControl >
            <FormLabel fontSize={'large'}>Course</FormLabel>
            <CheckboxGroup onChange={setCourse} value={course}>
              <HStack spacing={4}>
                <Checkbox value="MCA">MCA</Checkbox>
                <Checkbox value="MTECH">MTECH</Checkbox>
                <Checkbox value="BE">BE</Checkbox>
              </HStack>
            </CheckboxGroup>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={'large'}>Image Upload</FormLabel>
            <Input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" fontSize={'large'}>
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateEmployee;
