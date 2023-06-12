package com.Manipulus.arctic.Item.service;
import com.Manipulus.arctic.Item.exception.ItemNotFoundException;
import com.Manipulus.arctic.Item.model.Item;
import com.Manipulus.arctic.Item.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;

    }
    public Item addItem(Item item){
        item.setItem_code(UUID.randomUUID().toString());
        return itemRepository.save(item);
    }
    public List<Item> findAllItem(){return itemRepository.findAll();
    }
    public Item updateItem(Item item){ return itemRepository.save(item);
    }
    public Item findItemById(Long id){
        return (Item) itemRepository.findItemById(id)
                .orElseThrow( ()-> new ItemNotFoundException(" item by id" + id + "was not found") );
    }

    @Transactional
    public void deleteItemById(long id){
        itemRepository.deleteItemById(id);
    }
}
