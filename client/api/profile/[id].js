// import axios from 'axios';

// export async function getServerSideProps(ctx) {
//     try {
//         const res = await axios.get(`/profile${ctx.params.id}`);
//         if (res.status === 200) {
//             const data = await res.json();
//             return { props: { profile: data, loading: false } };
//         } else {
//             return {
//                 props: { profile: null, loading: false, error: res.data.msg },
//             };
//         }
//     } catch (err) {
//         return {
//             props: {
//                 profile: null,
//                 loading: false,
//                 error: 'Profile not found',
//             },
//         };
//     }
// }
