package finale.service;

import java.util.Optional;

import org.springframework.data.domain.Page;

import finale.model.Festival;

public interface FestivalService {

	Page<Festival> findAll(int pageNo);

	Festival findById(Long id);

	Optional<Festival> findOneById(Long id);

	Festival save(Festival festival);

	Festival update(Festival festival);

	Festival delete(Long id);

	Page<Festival> search(String name, Long placeId, int pageNo);
}
