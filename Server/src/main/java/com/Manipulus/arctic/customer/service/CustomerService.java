package com.Manipulus.arctic.customer.service;
import com.Manipulus.arctic.customer.exception.CustomerNotFoundException;
import com.Manipulus.arctic.customer.model.Customer;
import com.Manipulus.arctic.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {
    private final com.Manipulus.arctic.customer.repository.CustomerRepository CustomerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.CustomerRepository= customerRepository;
    }

    public Customer addCustomer(Customer customer){
        customer.setCustomerCode(UUID.randomUUID().toString());
        return CustomerRepository.save(customer);
    }

    public List<Customer> findAllCustomers(){
        return CustomerRepository.findAll();
    }
    public Customer updateCustomer(Customer customer){
        return CustomerRepository.save(customer);
    }
    public Customer findCustomerById(Long id){
        return CustomerRepository.findCustomerById(id)
                .orElseThrow(()-> new CustomerNotFoundException(" customer by id"+ id + "was not found"));
    }

    @Transactional
    public void deleteCustomerById(Long id){
        CustomerRepository.deleteCustomerById(id);
    }
//    @DeleteMapping("/employees/{id}")
//    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable long id){
//        Employee emp = emp_repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: "+id));
//
//        emp_repo.delete(emp);
//        Map<String,Boolean> response = new HashMap<>();
//        response.put("Deleted",Boolean.TRUE);
//        return ResponseEntity.ok(response);
    }

