using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace StatFB.Configurations
{
    public class FacebookSection : ConfigurationSection
    {
        [ConfigurationProperty("setting")]
        public SettingElement Config
        {
            get { return (SettingElement)this["setting"]; }
            set { this["setting"] = value; }
        }
    }

    public class SettingElement : ConfigurationElement
    {
        [ConfigurationProperty("appid")]
        public string AppId
        {
            get { return (string) this["appid"]; }
            set { this["appid"] = value; }
        }

        [ConfigurationProperty("appsecret")]
        public string AppSecret
        {
            get { return (string)this["appsecret"]; }
            set { this["appsecret"] = value; }
        }

        [ConfigurationProperty("namespace")]
        public string Namespace
        {
            get { return (string)this["namespace"]; }
            set { this["namespace"] = value; }
        }

        [ConfigurationProperty("scope")]
        public string Scope
        {
            get { return (string)this["scope"]; }
            set { this["scope"] = value; }
        }
    }
}