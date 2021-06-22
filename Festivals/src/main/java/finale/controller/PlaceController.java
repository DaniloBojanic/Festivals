package finale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import finale.dto.PlaceDTO;
import finale.model.Place;
import finale.service.PlaceService;
import finale.support.PlaceToPlaceDTO;

@RestController
@RequestMapping(value = "/api/places", produces = MediaType.APPLICATION_JSON_VALUE)
public class PlaceController {

	@Autowired
	private PlaceService placeService;
	
	@Autowired
	private PlaceToPlaceDTO toPlaceDTO;
	
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	@GetMapping
	public ResponseEntity<List<PlaceDTO>> getAll(){
		List<Place> mesta = placeService.findAll();
		
		return new ResponseEntity<>(toPlaceDTO.convert(mesta),HttpStatus.OK);
	}
}
