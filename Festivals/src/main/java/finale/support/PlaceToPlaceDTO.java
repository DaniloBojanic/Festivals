package finale.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import finale.dto.PlaceDTO;
import finale.model.Place;

@Component
public class PlaceToPlaceDTO implements Converter<Place,PlaceDTO>{

	@Override
	public PlaceDTO convert(Place source) {
		PlaceDTO dto = new PlaceDTO();
		
		dto.setId(source.getId());
		dto.setCountry(source.getCountry());
		dto.setCity(source.getCity());
		
		return dto;
	}
	
	public List<PlaceDTO> convert(List<Place> places){
		List<PlaceDTO> dto = new ArrayList<>();
		
		for(Place mesto : places) {
			dto.add(convert(mesto));
		}
		return dto;
	}
}
