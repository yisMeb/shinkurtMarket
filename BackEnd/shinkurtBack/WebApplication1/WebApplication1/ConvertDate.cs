using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace WebApplication1
{
    public class ConvertDate : ValueConverter<DateOnly, DateTime>
    {
            public ConvertDate()
                : base(dateOnly =>
                        dateOnly.ToDateTime(TimeOnly.MinValue),
                    dateTime => DateOnly.FromDateTime(dateTime))
            { }
    }
}
