using System;

namespace DwellDealAPI.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int LastUpdatedBy {get; set;}
        public DateTime LastUpdatedOn {get;set;}
        
    }
}