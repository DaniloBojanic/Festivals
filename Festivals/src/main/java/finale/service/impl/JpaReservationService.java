package finale.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import finale.model.Festival;
import finale.model.Reservation;
import finale.repository.ReservationRepository;
import finale.service.ReservationService;

@Service
public class JpaReservationService implements ReservationService{

	@Autowired
	private ReservationRepository rezervacijaRepository;

	@Override
	public Reservation getOne(Long id) {
		return rezervacijaRepository.getOne(id);
	}

	@Override
	public Reservation reserve(Reservation rezervacija) {
		Festival festival = rezervacija.getFestival();
		
		
		if(rezervacija.getBoughtTickets() <= festival.getAvailableTickets()) {
		festival.setAvailableTickets(festival.getAvailableTickets() - rezervacija.getBoughtTickets());
		
		
		int priceForOne = festival.getTicketPrice();
		
		int total = priceForOne * rezervacija.getBoughtTickets();
		
		rezervacija.setTotalPrice(total);
		
		return rezervacijaRepository.save(rezervacija);
		}
		return null;
		
		
	}
}
