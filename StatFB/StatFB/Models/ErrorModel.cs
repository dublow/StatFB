using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatFB.Models
{
    public class ErrorModel
    {

        public string Type { get; set; }
        public string StackTrace { get; set; }
        public string Message { get; set; }

        public ErrorModel(string type, string stackTrace, string message)
        {
            this.Type = type;
            this.StackTrace = stackTrace;
            this.Message = message;
        }
    }
}