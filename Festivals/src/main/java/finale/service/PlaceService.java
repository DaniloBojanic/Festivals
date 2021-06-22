package finale.service;

import java.util.List;

import finale.model.Place;

public interface PlaceService {

	List<Place> findAll();

	Place findOneById(Long id);
}
