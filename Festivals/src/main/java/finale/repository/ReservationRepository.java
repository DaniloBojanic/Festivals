package finale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import finale.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long>{

}
