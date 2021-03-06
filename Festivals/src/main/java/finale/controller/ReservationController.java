package finale.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import finale.dto.ReservationDTO;
import finale.model.Reservation;
import finale.service.ReservationService;
import finale.support.ReservationDTOToReservation;
import finale.support.ReservationToReservationDTO;

@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {
	
	@Autowired
	private ReservationService reservationService;
	
	@Autowired
	private ReservationDTOToReservation toReservation;
	
	@Autowired
	private ReservationToReservationDTO toReservationDTO;
	
	//@PreAuthorize("hasRole('KORISNIK')")
	@GetMapping(value="/{id}")
	public ResponseEntity<ReservationDTO> getOne(@PathVariable Long id){
		Reservation rez = reservationService.getOne(id);
		
		return new ResponseEntity<>(toReservationDTO.convert(rez),HttpStatus.OK);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReservationDTO> create(@Valid @RequestBody ReservationDTO reservationDTO){
		Reservation reservation = toReservation.convert(reservationDTO);
		
				
		Reservation reserved = reservationService.reserve(reservation);
		
		return new ResponseEntity<>(toReservationDTO.convert(reserved),HttpStatus.CREATED);
	}

}
