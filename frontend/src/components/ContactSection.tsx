import { useState, useEffect, useRef, FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const SocialLinks ={
    GitHub: "https://github.com/rohitgupta122343-ui",
    LinkedIn: "https://www.linkedin.com/in/rohit-gupta-75aa64398/",
    Instagram: "https://www.instagram.com/rohit420_op/"
  }
  useEffect(() => {
    if (formRef.current && sectionRef.current) {
      const elements = formRef.current.querySelectorAll('.form-element');

      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

 
    try {
    
  const  response=  await fetch('https://rohit-z8mv.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-20 min-h-screen px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="font-body text-xs tracking-[0.5em] text-foreground/40">
            06 — CONTACT
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
            Get in Touch
          </h2>
          <p className="mx-auto mt-6 max-w-md font-body text-foreground/60">
            Have a project in mind? Let's create something amazing together.
          </p>
        </div>

        {/* Contact form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          {/* Name field */}
          <div className="form-element">
            <label className="mb-2 block font-body text-xs tracking-[0.2em] text-foreground/60">
              NAME
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full border-b border-foreground/20 bg-transparent py-4 font-body text-lg text-foreground outline-none transition-colors duration-300 focus:border-foreground/60 placeholder:text-foreground/30"
              placeholder="Your name"
            />
          </div>

          {/* Email field */}
          <div className="form-element">
            <label className="mb-2 block font-body text-xs tracking-[0.2em] text-foreground/60">
              EMAIL
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full border-b border-foreground/20 bg-transparent py-4 font-body text-lg text-foreground outline-none transition-colors duration-300 focus:border-foreground/60 placeholder:text-foreground/30"
              placeholder="your@email.com"
            />
          </div>

          {/* Message field */}
          <div className="form-element">
            <label className="mb-2 block font-body text-xs tracking-[0.2em] text-foreground/60">
              MESSAGE
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="w-full resize-none border-b border-foreground/20 bg-transparent py-4 font-body text-lg text-foreground outline-none transition-colors duration-300 focus:border-foreground/60 placeholder:text-foreground/30"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit button */}
          <div className="form-element pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full border border-foreground/30 bg-transparent px-6 py-5 font-body text-sm tracking-widest uppercase text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground/5 md:w-auto md:px-16"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25" 
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>

        {/* Success message */}
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
            <div className="animate-scale-in text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/40">
                <svg
                  className="h-10 w-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg> 
              </div>
              <h3 className="font-display text-2xl text-foreground">Message Sent!</h3>
              <p className="mt-2 font-body text-foreground/60">
                I'll get back to you soon.
              </p>
            </div>
          </div>
        )}

        {/* Footer links */}
        <div className="mt-24 border-t border-foreground/10 pt-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex gap-8"> 
              {/* DUMMY: Replace with your actual social links */}
              {['GitHub', 'LinkedIn', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href={SocialLinks[social as keyof typeof SocialLinks]}
                  className="font-body text-sm text-foreground/50 transition-colors duration-300 hover:text-foreground"
                >
                  {social}
                </a>
              ))}
            </div>
            <p className="font-body text-xs text-foreground/30">
              © 2026 Rohit Gupta. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
