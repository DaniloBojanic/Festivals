package finale.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import finale.model.Festival;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {

	Festival findOneById(Long id);

	List<Festival> findByIdIn(List<Long> ids);

	@Query("SELECT l FROM Festival l WHERE " + "(:name IS NULL OR l.name like %:name%) AND "
			+ "(:placeId IS NULL OR l.place.id = :placeId) ")
	Page<Festival> search(@Param("name") String name, @Param("placeId") Long placeId, Pageable pageable);
}
