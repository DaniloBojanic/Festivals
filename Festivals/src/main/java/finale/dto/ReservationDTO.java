package finale.dto;

public class ReservationDTO {

	 private Long id;
		
		
		private int boughtTickets;
		
		
		private int totalPrice;
		
		
		private FestivalDTO festival;


		public ReservationDTO() {
			super();
		}


		public Long getId() {
			return id;
		}


		public void setId(Long id) {
			this.id = id;
		}


		public int getBoughtTickets() {
			return boughtTickets;
		}


		public void setBoughtTickets(int boughtTickets) {
			this.boughtTickets = boughtTickets;
		}


		public int getTotalPrice() {
			return totalPrice;
		}


		public void setTotalPrice(int totalPrice) {
			this.totalPrice = totalPrice;
		}


		public FestivalDTO getFestival() {
			return festival;
		}


		public void setFestival(FestivalDTO festival) {
			this.festival = festival;
		}
		
		
		
}
