package finale.dto;

import org.hibernate.validator.constraints.Length;

public class FestivalDTO {

	private Long id;
	
	@Length(max=50)
	private String name;
	
	private String dateStart;


	private String dateEnd;
	
//	@Positive
	private int ticketPrice;
	
	
	private int availableTickets;
	
	
	private PlaceDTO place;
	
	boolean finished;
	

	public FestivalDTO() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDateStart() {
		return dateStart;
	}

	public void setDateStart(String dateStart) {
		this.dateStart = dateStart;
	}

	public String getDateEnd() {
		return dateEnd;
	}

	public void setDateEnd(String dateEnd) {
		this.dateEnd = dateEnd;
	}

	public int getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(int ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public int getAvailableTickets() {
		return availableTickets;
	}

	public void setAvailableTickets(int availableTickets) {
		this.availableTickets = availableTickets;
	}

	public PlaceDTO getPlace() {
		return place;
	}

	public void setPlace(PlaceDTO place) {
		this.place = place;
	}

	public boolean isFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}
	
	
}
