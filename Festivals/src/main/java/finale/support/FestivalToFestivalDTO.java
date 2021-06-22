package finale.support;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.FestivalDTO;
import finale.model.Festival;

@Component
public class FestivalToFestivalDTO implements Converter<Festival,FestivalDTO>{

	@Autowired
	private PlaceToPlaceDTO toPlaceDTO;

	@Override
	public FestivalDTO convert(Festival source) {
		FestivalDTO dto = new FestivalDTO();
		
		dto.setId(source.getId());
		dto.setAvailableTickets(source.getAvailableTickets());
		dto.setTicketPrice(source.getTicketPrice());
		dto.setDateStart(source.getDateStart().toString());
		dto.setDateEnd(source.getDateEnd().toString());
		dto.setPlace(toPlaceDTO.convert(source.getPlace()));
		dto.setName(source.getName());
		
		if(source.getDateEnd().compareTo(LocalDate.now()) < 1) {
			dto.setFinished(true);
		}
		
		return dto;
	
	}
	public List<FestivalDTO> convert(List<Festival> festivali){
		List<FestivalDTO> dto = new ArrayList<>();
		
		for(Festival festival : festivali) {
			dto.add(convert(festival));
		}
		return dto;
	}
}
