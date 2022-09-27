namespace BookStoreApp.Data.Models{
    public class User{
        public int UserId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string PhoneNumber { get; set; } = String.Empty;
        public Role Role {get; set; } = new Role();
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();
        public byte[] PasswordSalt { get; set; }= Array.Empty<byte>();
        public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    }
    public class Role{
        public int RoleId { get; set; }
        public string Name { get; set; } = String.Empty;
    }
}