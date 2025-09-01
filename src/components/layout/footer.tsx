import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="mb-4 inline-block text-xl font-bold text-primary">
                ArogyaCare
            </Link>
            <p className="text-sm">Your complete healthcare companion.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/medicines" className="hover:text-primary transition-colors">Medicines</Link></li>
              <li><Link href="/hospitals" className="hover:text-primary transition-colors">Hospitals</Link></li>
              <li><Link href="/camps" className="hover:text-primary transition-colors">Health Camps</Link></li>
              <li><Link href="/ai-doctor" className="hover:text-primary transition-colors">AI Doctor</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-primary transition-colors">Facebook</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ArogyaCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
