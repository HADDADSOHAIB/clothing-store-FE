using AutoMapper;
using SocialECommerce.Models.Business_Models;
using SocialECommerce.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialECommerce.Auto_mapper
{
    public class CredentialsProfile:Profile
    {
        public CredentialsProfile()
        {
            CreateMap<CredentialsDto, Credentials>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password));
            CreateMap<Credentials, CredentialsDto>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password));
        }
    }
}
