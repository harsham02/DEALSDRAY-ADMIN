import {
    Button, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast
  } from '@chakra-ui/react';
  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import { FaRegEdit } from "react-icons/fa";
  import { FaTrashCan } from "react-icons/fa6";
  import UpdateEmployee from './UpdateEmployee'; 
  import defaultImg from '../assets/user.png';
  

  const EmployeesTable = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
  
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get('https://dealsdray-admin.onrender.com/api/employees');
          setEmployees(response.data);
          setFilteredEmployees(response.data);
        } catch (err) {
          toast({
            title: 'Error fetching employees',
            description: err.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      };
  
      fetchEmployees();
    }, []);
  
    useEffect(() => {
      let results = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        emp._id.toLowerCase().includes(searchKeyword.toLowerCase())
      );
  
      // Sorting
      results = results.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a[sortField] > b[sortField] ? 1 : -1;
        } else {
          return a[sortField] < b[sortField] ? 1 : -1;
        }
      });
  
      setFilteredEmployees(results);
    }, [searchKeyword, sortField, sortOrder, employees]);
  
    const handleUpdate = (employee) => {
      setSelectedEmployee(employee);
      onOpen(); 
    };
  
    const handleDelete = async (employeeId) => {
      try {
        await axios.delete(`https://dealsdray-admin.onrender.com/api/employees/${employeeId}`);
        setEmployees(employees.filter(emp => emp._id !== employeeId));
        toast({
          title: 'Employee deleted',
          description: 'The employee was successfully deleted.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        location.reload();
      } catch (err) {
        toast({
          title: 'Error deleting employee',
          description: err.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    const paginatedEmployees = filteredEmployees.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
  
    return (
      <div>
        <HStack spacing={4} marginBottom={4}>
          <Input
            placeholder="Search"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            maxW={80}
            marginLeft={10}
            background="#d4f2f2"
          />
          <Select
            onChange={(e) => setSortField(e.target.value)}
            value={sortField}
            maxW={80}
            background="#d4f2f2"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="_id">ID</option>
            <option value="createDate">Create Date</option>
          </Select>
          <Select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            maxW={80}
            background="#d4f2f2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </HStack>
        <Table variant="simple" bg={'silver'} maxW={'200px'} maxH={'240px'} margin={'auto'}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Image</Th>
              <Th>Email</Th>
              <Th>Mobile No</Th>
              <Th>Designation</Th>
              <Th>Gender</Th>
              <Th>Course</Th>
              <Th>Create Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody padding={'0px'} margin={'0px'}>
            {paginatedEmployees.map((employee, index) => (
              <Tr key={employee._id}>
                <Td>{(page - 1) * itemsPerPage + index + 1}</Td>
                <Td>{employee.name}</Td>
                <Td>
                  <img
                    src={defaultImg}
                    alt={'img'}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </Td>
                <Td>{employee.email}</Td>
                <Td>{employee.phoneNumber}</Td>
                <Td>{employee.designation}</Td>
                <Td>{employee.gender}</Td>
                <Td>{employee.course}</Td>
                <Td>{new Date(employee.createDate).toLocaleDateString()}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<FaRegEdit />}
                    onClick={() => handleUpdate(employee)}
                    mb={2}
                    color={'green'}
                    borderRadius={'28px'}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<FaTrashCan />}
                    onClick={() => handleDelete(employee._id)}
                    margin={'2px'}
                    color={'red'}
                    borderRadius={'28px'}
                 />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <HStack spacing={8} margin={3} justifyContent={'space-between'}>
          <Button marginBottom={30}
           justifyContent={'end'}
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
          >
            Previous
          </Button>
          <Button marginBottom={30}
            onClick={() => setPage(page < Math.ceil(filteredEmployees.length / itemsPerPage) ? page + 1 : page)}
          >
            Next
          </Button>
        </HStack>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={'500px'}>
            <ModalHeader color={'blue'} bg={'#fdfcf8'} textAlign={'center'}>
              Update Employee
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody padding={'0'} margin={'0'}>
              {selectedEmployee && <UpdateEmployee employee={selectedEmployee} onClose={onClose} />}
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }
  
  export default EmployeesTable;
  