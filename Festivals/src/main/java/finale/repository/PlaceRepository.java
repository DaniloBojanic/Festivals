package finale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import finale.model.Place;

@Repository
public interface PlaceRepository  extends JpaRepository<Place,Long> {

}
