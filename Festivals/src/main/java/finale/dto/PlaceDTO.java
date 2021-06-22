package finale.dto;

import javax.validation.constraints.Size;

public class PlaceDTO {

	private Long id;
	
	
	private String city;
	
	
	@Size(min=0,max=3)
	private String country;


	public PlaceDTO() {
		super();
	}


	public Long getId() {
		return id;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}


	public void setId(Long id) {
		this.id = id;
	}
	
	
}
