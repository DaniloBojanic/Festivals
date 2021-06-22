package finale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import finale.model.Festival;

@Repository
public interface FestivalRepository extends JpaRepository<Festival,Long> {

	List<Festival> findByPlaceIdAndNameIgnoreCaseContains(Long placeId, String name);

	List<Festival> findByNameIgnoreCaseContains(String name);
}