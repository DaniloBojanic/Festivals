package finale.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.ReservationDTO;
import finale.model.Reservation;

@Component
public class ReservationToReservationDTO implements Converter<Reservation,ReservationDTO>{

	@Autowired
	private FestivalToFestivalDTO toFestivalDTO;

	@Override
	public ReservationDTO convert(Reservation source) {
		ReservationDTO dto = new ReservationDTO();
		
		dto.setBoughtTickets(source.getBoughtTickets());
		dto.setId(source.getId());
		dto.setTotalPrice(source.getTotalPrice());
		dto.setFestival(toFestivalDTO.convert(source.getFestival()));
		
		return dto;
		
	}
}
