import './styles.css';

import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Employee } from 'types/employee';
import { AxiosRequestConfig } from 'axios';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

const List = () => {

  const [page, setPage] = useState<SpringPage<Employee>>();

  useEffect(() => {
    handlePageChange(0);
  }, []);

  const handlePageChange = (pageNumber: number) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/employees',
      params: {
        page: pageNumber,
        size: 10,
      },
      withCredentials: true
    }; 
    requestBackend(config)
      .then((response) => {
        setPage(response.data);
        console.log(response.data);
      });
  }

  return (
    <>
      <Link to="/admin/employees/create">
        <button className="btn btn-primary text-white btn-crud-add">
          ADICIONAR
        </button>
      </Link>

      {page?.content.map((employee) => (
            <div key={employee.id}>
                <EmployeeCard employee={employee} />
            </div>
          ))
      }

      <Pagination
        forcePage={0}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
