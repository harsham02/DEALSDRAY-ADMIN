import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { IoIosAddCircle } from "react-icons/io";

import {
  Button, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import CreateEmployee from '../components/CreateEmployee';
import axios from 'axios';
import EmployeesTable from '../components/EmployeesTable';
import MainData from '../components/MainData';

const Dashboard = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [employeesCount, setEmployeesCount] = useState(0);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      const employees = response.data;
      setEmployees(employees);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    setEmployeesCount(employees.length);
  }, [employees]);

  const handleClose = () => {
    onClose();
    fetchEmployees();
  };

  return (
    <div className='dashboard'>

      <MainData />
      <div className='control-panels'>
        <Button bg={'transparent'} color={'whitesmoke'}>
          Total Count : {employeesCount}
        </Button>
        <Button onClick={onOpen} bg={'transparent'} color={'whitesmoke'}>
          Create Employee <IoIosAddCircle className='add-icon'/>
        </Button>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent maxW={'500px'}>
          <ModalHeader color={'blue'} bg={'#fdfcf8'} textAlign={'center'}>
            Create New Employee
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={'0'} margin={'0'}>
            <CreateEmployee onClose={handleClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <EmployeesTable employees={employees} />
    </div>
  );
};

export default Dashboard;