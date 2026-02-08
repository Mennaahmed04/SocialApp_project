// // import * as zod from 'zod'
// //  export const registerScheme = zod.object({
// //     name:zod.string().nonempty('name is required').min(2,'min length 2 char').max(5,'max length 5 char'),
// //     email:zod.string().nonempty('email is required').email('email not valid'),
// //     password:zod.string().nonempty('password is required').regex(/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'not valid password'),
// //     rePassword:zod.string(),
// //     dateOfBirth:zod.coerce.string(),
// //     gender:zod.string().regex(/^(female|male)$/)
// // })
// // .refine((data)=>data.password===data.rePassword,
// // {   message:'repassword different', 
// //     path:['rePassword']

// // });

// import * as zod from 'zod'

// export const registerScheme = zod.object({
//     name: zod.string().nonempty('name is required').min(2,'min length 2 char').max(5,'max length 5 char'),
//     email: zod.string().nonempty('email is required').email('email not valid'),
//     password: zod
//       .string()
//       .regex(/^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[#?!@$%^&*-]).{8,}$/),
//     rePassword: zod.string(),

//     dateOfBirth: zod.coerce.string(),
//     gender: zod.string().regex(/^(female|male)$/)
// })
// .refine((data)=> data.password === data.rePassword,
// {
//     message: 'repassword different',
//     path: ['rePassword']   // ✔️ هنا التصحيح
// });

import * as zod from "zod";

export const registerScheme = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "name must be more than 2 letters")
      .max(10, "name must be less than 10 letters"),
    email: zod
      .string()
      .nonempty("email is required")
      .email("email is not vaild"),
    password: zod
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/),
    rePassword: zod.string(),
    dateOfBirth: zod
  .string()
  .nonempty("Date of birth is required")
  .refine((val) => !isNaN(Date.parse(val)), {
    message: "Date of Birth must be a valid date",
  }),

    gender: zod.enum(["male", "female"], {
      required_error: "gender is required",
    }),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "password is not matching with repassword",
    path: ["rePassword"],
});