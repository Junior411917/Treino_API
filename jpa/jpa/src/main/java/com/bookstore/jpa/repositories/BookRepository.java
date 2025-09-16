package com.bookstore.jpa.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookstore.jpa.models.BookModel;
import java.util.List;

public interface BookRepository extends JpaRepository<BookModel, UUID> {

	BookModel findBookModelByTitle(String title);

	@Query(value = "SELECT * FROM tb_book WHERE publisher_id = :id", nativeQuery = true)
	List<BookModel> findByPublisherId(@Param("id") UUID id);
}
