using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using System.Collections;

namespace WebConfession.Models
{
    [Table("Cfs")]
    public class Cfs
    {
        [Key]
        public int ConfessionId { get; set; }


        [MaxLength(200), Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "*")]
        public string ConfessionSendTime { get; set; }


        [MaxLength(200), Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "*")]
        public string ConfessionSender { get; set; }


        [MaxLength(200), Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "*")]
        public string ConfessionRecipient { get; set; }


        [Column(TypeName = "ntext")]
        [Required(ErrorMessage = "*")]
        public string ConfessionContent { get; set; }



        [MaxLength(1000), Column(TypeName = "nvarchar")]
        [Required(ErrorMessage = "*")]
        public string ConfessionImg { get; set; }


        [Required(ErrorMessage = "*")]
        public bool ConfessionAproved { get; set; }

        public static List<Cfs> confessions = new List<Cfs>() { };

    }
}