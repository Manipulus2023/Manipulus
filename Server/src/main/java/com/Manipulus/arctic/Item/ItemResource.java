package com.Manipulus.arctic.Item;
import com.Manipulus.arctic.Item.model.Item;
import com.Manipulus.arctic.Item.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController   //used to handle HTTP requests and responses
@RequestMapping("/item")       //used to specify the base URL
public class ItemResource {
    private final ItemService itemService;

    public ItemResource(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Item>> getAllItem(){
        List<Item> items = itemService.findAllItem();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")      //used to handle GET requests to retrieve all the items or a specific item by its ID.
    public ResponseEntity<Item> getItemById(@PathVariable("id") Long id){
        Item items = itemService.findItemById(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping("/add")   //used to handle POST requests to create a new item.
    public ResponseEntity<Item> addItem(@RequestBody Item item){
        Item newItem = itemService.addItem(item);
        return new ResponseEntity<>(newItem, HttpStatus.CREATED);

    }

    @PutMapping("/update")       //used to handle PUT requests to update an existing item.
    public ResponseEntity<Item> updateItem(@RequestBody Item item){
       Item updateItem = itemService.updateItem(item);
       return new ResponseEntity<>(updateItem,HttpStatus.CREATED);
    }

    @DeleteMapping ("/delete/{id}")    //used to handle DELETE requests to delete an item by its ID.
    public void deleteItem(@PathVariable("id") Long id){
        itemService.deleteItemById(id);
    }

}
