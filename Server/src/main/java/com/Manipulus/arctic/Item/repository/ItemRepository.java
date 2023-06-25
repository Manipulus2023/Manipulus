package com.Manipulus.arctic.Item.repository;
import com.Manipulus.arctic.Item.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item,Long> {
    void deleteItemById(long id);
    Optional<Object> findItemById(Long id);
}
