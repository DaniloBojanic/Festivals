package finale.support;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.FestivalDTO;
import finale.model.Festival;
import finale.service.FestivalService;
import finale.service.PlaceService;

@Component
public class FestivalDTOtoFestival implements Converter<FestivalDTO,Festival> {

	@Autowired
	private PlaceService placeService;
	
	@Autowired
	private FestivalService festivalService;
	
	
	
	 private LocalDate getLocalDate(String datumS) {
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        LocalDate datum = LocalDate.parse(datumS, formatter);
	     
	        return datum;
	    }
	 
	 @Override
		public Festival convert(FestivalDTO dto) {
			Festival festival;
			
			if(dto.getId() != null) {
				festival = festivalService.findById(dto.getId());
				
			}else {
				festival = new Festival();
			}
			festival.setId(dto.getId());
			festival.setAvailableTickets(dto.getAvailableTickets());
			festival.setTicketPrice(dto.getTicketPrice());
			festival.setDateStart(getLocalDate(dto.getDateStart()));
			festival.setDateEnd(getLocalDate(dto.getDateEnd()));
			festival.setPlace(placeService.findOneById(dto.getPlace().getId()));
			festival.setName(dto.getName());
			
			return festival;
			
			
		}
}
