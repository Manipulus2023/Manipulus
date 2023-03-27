package com.Manipulus.arctic.customer;

import com.Manipulus.arctic.customer.model.Customer;
import com.Manipulus.arctic.customer.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")

public class CustomerResource {
    private final CustomerService customerService;

    public CustomerResource(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllCustomer(){
        List<Customer> customers = customerService.findAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("id") Long id){
       Customer customer = customerService.findCustomerById(id);
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer){
        Customer newCustomer = customerService.addCustomer(customer);
        return new ResponseEntity<>(newCustomer, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer){
        Customer updateCustomer = customerService.updateCustomer(customer);
        return new ResponseEntity<>(updateCustomer, HttpStatus.CREATED);
    }


    @DeleteMapping ("/delete/{id}")
    public void deleteCustomer(@PathVariable("id") Long id){
        customerService.deleteCustomerById(id);
    }



//        return new ResponseEntity<>(HttpStatus.OK);


//    @DeleteMapping("/employees/{id}")
//    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable long id){
//        Employee emp = emp_repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id: "+id));
//
//        emp_repo.delete(emp);
//        Map<String,Boolean> response = new HashMap<>();
//        response.put("Deleted",Boolean.TRUE);
//        return ResponseEntity.ok(response);
//    }

}
