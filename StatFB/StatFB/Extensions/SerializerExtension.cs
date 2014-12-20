using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StatFB.Extensions
{
    public static class SerializerExtension
    {
        public static string ToJson(this object obj)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        }

        public static T FromJson<T>(string value)
        {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(value);
        }
    }
}