package finale.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.ReservationDTO;
import finale.model.Reservation;
import finale.service.FestivalService;
import finale.service.ReservationService;

@Component
public class ReservationDTOToReservation implements Converter<ReservationDTO,Reservation>{

	@Autowired
	private ReservationService rezervacijaService;
	
	@Autowired
	private FestivalService festivalService;

	@Override
	public Reservation convert(ReservationDTO dto) {
		Reservation rezervacija;
		
		if(dto.getId() != null) {
			rezervacija = rezervacijaService.getOne(dto.getId());
		}else {
			rezervacija = new Reservation();
		}
		
			rezervacija.setFestival(festivalService.findById(dto.getFestival().getId()));
			rezervacija.setBoughtTickets(dto.getBoughtTickets());
			rezervacija.setId(dto.getId());
			rezervacija.setTotalPrice(dto.getTotalPrice());
			
		
		return rezervacija;
	}
}
