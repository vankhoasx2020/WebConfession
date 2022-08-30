using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using WebConfession.Models;

namespace WebConfession.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfessionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ConfessionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Confession
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cfs>>> GetCfss()
        {
          if (_context.Cfss == null)
          {
              return NotFound();
          }
            return await _context.Cfss.ToListAsync();
        }

        // GET: api/Confession/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cfs>> GetCfs(int id)
        {
          if (_context.Cfss == null)
          {
              return NotFound();
          }
            var cfs = await _context.Cfss.FindAsync(id);

            if (cfs == null)
            {
                return NotFound();
            }

            return cfs;
        }


        // GET: api/Confession/5
        //[Route("search/{keyword}")]
        //[HttpGet]
        //public async Task<ActionResult<List<Cfs>>> SearchCfs(string keyword)
        //{
        //    if (_context.Cfss == null)
        //    {
        //        return NotFound();
        //    }
        //    //List<Cfs> Cfss = _context.Cfss;
        //    var searchCfs = _context.Cfss.Where(c => c.ConfessionSender.Contains(keyword)).ToList();
        //    return searchCfs;

        //    if (searchCfs == null)
        //    {
        //        return NotFound();
        //    }

        //    //return cfs;
        //}

        [HttpGet]
        [Route("search/{keyword}")]
        public IEnumerable<Cfs> Search(string keyword)
        {
            var searchCfss = new List<Cfs>();
            string connectionString = "Server=.\\SQLEXPRESS;Database=webConfession;Trusted_Connection=True";

            // khởi tạo đối tượng sql connection
            SqlConnection sqlConnection = new SqlConnection(connectionString);
            // đối tượng sql command cho phép thao tác với CSDL

            SqlCommand sqlCommand = sqlConnection.CreateCommand();
            //sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;

            //Khai báo truy vấn

            sqlCommand.CommandText = $"select * from Cfs where CONCAT(ConfessionSender,' ', ConfessionRecipient,' ',ConfessionContent ) like N'%{keyword}%'";

            // Mở kết nối đến Database
            sqlConnection.Open();
            //Thực thi công việc với database
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();

            //Xử lý dữ liệu trả về:
            while (sqlDataReader.Read())
            {
                var cfs = new Cfs();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    // lấy tên cột dữ liệu đang đọc
                    var colName = sqlDataReader.GetName(i);

                    //Lấy giá trị cell đang đọc
                    var value = sqlDataReader.GetValue(i);

                    //Lấy ra property giống với tên cột được khai báo ở trên
                    var property = cfs.GetType().GetProperty(colName);

                    //Nếu có property tương ứng với tên cột thì gán dữ liệu tương ứng
                    if (property != null)
                    {

                        property.SetValue(cfs, value);
                    }
                }
                //add đối tượng vừa lấy ra vào list
                searchCfss.Add(cfs);
            }
            //Đóng kết nối
            sqlConnection.Close();
            searchCfss.Reverse();

            return searchCfss;
        }

        // PUT: api/Confession/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCfs(int id, Cfs cfs)
        {
            if (id != cfs.ConfessionId)
            {
                return BadRequest();
            }

            _context.Entry(cfs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CfsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Confession
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cfs>> PostCfs(Cfs cfs)
        {
          if (_context.Cfss == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Cfss'  is null.");
          }
            _context.Cfss.Add(cfs);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCfs", new { id = cfs.ConfessionId }, cfs);
        }

        // DELETE: api/Confession/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCfs(int id)
        {
            if (_context.Cfss == null)
            {
                return NotFound();
            }
            var cfs = await _context.Cfss.FindAsync(id);
            if (cfs == null)
            {
                return NotFound();
            }

            _context.Cfss.Remove(cfs);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CfsExists(int id)
        {
            return (_context.Cfss?.Any(e => e.ConfessionId == id)).GetValueOrDefault();
        }
    }
}
