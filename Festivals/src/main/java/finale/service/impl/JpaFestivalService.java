package finale.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import finale.model.Festival;
import finale.repository.FestivalRepository;
import finale.service.FestivalService;

@Service
public class JpaFestivalService implements FestivalService{

	@Autowired
	private FestivalRepository festivalRepository;

	@Override
	public Page<Festival> findAll(int pageNo) {
		return festivalRepository.findAll(PageRequest.of(pageNo, 2));
	}

	@Override
	public Festival findById(Long id) {
		return festivalRepository.getOne(id);
	}

	@Override
	public Optional<Festival> findOneById(Long id) {
		return festivalRepository.findById(id);
	}

	@Override
	public Festival save(Festival festival) {
		return festivalRepository.save(festival);
	}

	@Override
	public Festival update(Festival festival) {
		return festivalRepository.save(festival);
	}

	@Override
	public Festival delete(Long id) {
		Optional<Festival> festival = festivalRepository.findById(id);
		
		if(festival.isPresent()) {
			festivalRepository.deleteById(id);
			return festival.get();
		}
		return null;
	}

	@Override
	public List<Festival> find(Long placeId, String name) {
		if(placeId == null) {
			return festivalRepository.findByNameIgnoreCaseContains(name);
		}
		
		if(name == null) {
			name = "";
		}
		return festivalRepository.findByPlaceIdAndNameIgnoreCaseContains(placeId, name);
	}
}
