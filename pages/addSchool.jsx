import { useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

export default function AddSchool() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // append text fields
    Object.keys(data).forEach(key => {
      if (key !== "image") formData.append(key, data[key]);
    });

    // append file field separately
    if (file) {
      formData.append("image", file);
    }

    // debug → see what’s inside FormData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await fetch('/api/addSchool', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (result.message) {
      alert(result.message);
      router.push('/showSchools');
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="logo">SchoolDB</div>
        <nav>
          <a href="/addSchool">Home</a>
          <a href="/showSchools">Schools</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-login">Log In</button>
          <button className="btn btn-signup">Sign Up</button>
        </div>
      </header>

      <div className="page-content addschool-page">
        <div className="page-headline">
          <h1>Find & Add the Best Schools</h1>
          <p>Help parents discover quality education by adding verified schools to our platform.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <h2>Add School</h2>

          <div className="input-group">
            <input {...register("name", { required: true })} placeholder="School Name" />
          </div>
          {errors.name && <p>Name required</p>}

          <div className="input-group">
            <input {...register("address", { required: true })} placeholder="Address" />
          </div>
          {errors.address && <p>Address required</p>}

          <div className="input-group">
            <input {...register("city", { required: true })} placeholder="City" />
          </div>
          {errors.city && <p>City required</p>}

          <div className="input-group">
            <input {...register("state", { required: true })} placeholder="State" />
          </div>
          {errors.state && <p>State required</p>}

          <div className="input-group">
            <input {...register("contact", { required: true })} placeholder="Contact" />
          </div>
          {errors.contact && <p>Contact required</p>}

          <div className="input-group">
            <input type="email" {...register("email_id", { required: true })} placeholder="Email" />
          </div>
          {errors.email_id && <p>Valid email required</p>}

          <div className="input-group">
            <input 
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          {!file && <p>Image required</p>}

          <button type="submit">Add School</button>
        </form>
      </div>
    </>
  );
}
