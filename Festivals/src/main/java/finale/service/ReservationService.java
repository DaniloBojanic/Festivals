package finale.service;

import finale.model.Reservation;

public interface ReservationService {

	Reservation getOne(Long id);

	Reservation reserve(Reservation reservation);
}
