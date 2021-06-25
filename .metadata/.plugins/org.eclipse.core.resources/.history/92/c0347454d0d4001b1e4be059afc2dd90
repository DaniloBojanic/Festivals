package finale.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import finale.dto.FestivalDTO;
import finale.model.Festival;
import finale.service.FestivalService;
import finale.support.FestivalDTOtoFestival;
import finale.support.FestivalToFestivalDTO;

@RestController
@RequestMapping(value = "/api/festivals", produces = MediaType.APPLICATION_JSON_VALUE)
public class FestivalController {
	
	@Autowired
	private FestivalService festivalService;
	
	@Autowired
	private FestivalToFestivalDTO toFestivalDTO;
	
	@Autowired
	private FestivalDTOtoFestival toFestival;
	
//	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	@GetMapping
	public ResponseEntity<List<FestivalDTO>> getAll(@RequestParam(defaultValue = "0") int pageNo){
		Page<Festival> svi = festivalService.findAll(pageNo);
		
		HttpHeaders headers = new HttpHeaders();
		headers.set("Total-Pages", svi.getTotalPages() + "");
		
		return new ResponseEntity<>(toFestivalDTO.convert(svi.getContent()),HttpStatus.OK);
		
	}
		@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	 	@GetMapping(value="/{id}")
		public ResponseEntity<FestivalDTO> getById(@PathVariable Long id){
			Optional<Festival> festival = festivalService.findOneById(id);
			
			if(festival.isPresent()) {
				return new ResponseEntity<>(toFestivalDTO.convert(festival.get()),HttpStatus.OK);
			}else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			
		}
		@PreAuthorize("hasRole('ADMIN')")
	 	@PostMapping
	 	public ResponseEntity<FestivalDTO> create(@Valid @RequestBody FestivalDTO festivalDTO){
	 		Festival festival = toFestival.convert(festivalDTO);
	 		
	 		Festival sacuvan = festivalService.save(festival);
	 		
	 		
	 		return new ResponseEntity<>(toFestivalDTO.convert(sacuvan),HttpStatus.CREATED);
	 	}
	 	
		 @PreAuthorize("hasRole('ADMIN')")
	 	 @PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
		 public ResponseEntity<FestivalDTO> update(@PathVariable Long id, @Valid @RequestBody FestivalDTO festivalDTO){

		        if(!id.equals(festivalDTO.getId())) {
		            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		        }

		        Festival festival = toFestival.convert(festivalDTO);
		        
		        Festival izmenjen = festivalService.update(festival);

		        return new ResponseEntity<>(toFestivalDTO.convert(izmenjen),HttpStatus.OK);
		    }
		 @PreAuthorize("hasRole('ADMIN')")	
	 	 @DeleteMapping(value="/{id}")
	 	 public ResponseEntity<FestivalDTO> delete(@PathVariable Long id){
	 	 		Festival delited = festivalService.delete(id);
	 	 		
	 	 		if(delited != null) {
	 	 			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	 	 		}else {
	 	 			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	 	 		}
	 	 		
	 	 	}
		 
		 @GetMapping(value="/search")
		 public ResponseEntity<List<FestivalDTO>> search(@RequestParam(required=false) Long placeId,@RequestParam(required=false) String name){
			 List<Festival> rezultat = festivalService.find(placeId, name);
			 
			 return new ResponseEntity<>(toFestivalDTO.convert(rezultat),HttpStatus.OK);
		 }
}
