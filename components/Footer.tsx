export default function Footer() {
  return (
    <footer className="bg-off-white pt-10">
      <nav className="flex items-center justify-center gap-6 pb-6">
        <a href="#" className="text-sm text-navy hover:underline">Terms of Use</a>
        <a href="#" className="text-sm text-navy hover:underline">Privacy Policy</a>
        <a href="#" className="text-sm text-navy hover:underline">Contact Us</a>
      </nav>
      <div className="bg-navy text-white text-center py-5 text-[13px]">
        &copy; 2025 SlimGovy. All Rights Reserved. | These statements have not been evaluated by the FDA.
        This product is not intended to diagnose, treat, cure, or prevent any disease.
      </div>
    </footer>
  )
}
