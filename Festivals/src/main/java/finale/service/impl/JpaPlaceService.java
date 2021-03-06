package finale.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import finale.model.Place;
import finale.repository.PlaceRepository;
import finale.service.PlaceService;

@Service
public class JpaPlaceService implements PlaceService {

	@Autowired
	private PlaceRepository placeRepository;

	@Override
	public List<Place> findAll() {
		return placeRepository.findAll();

	}

	@Override
	public Place findOneById(Long id) {
		return placeRepository.getOne(id);
	}
}
