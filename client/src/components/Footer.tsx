export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                <i className="fa-solid fa-dumbbell text-primary-foreground text-xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl">Fitness Blueprint</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your AI-powered fitness companion for personalized training and nutrition advice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-muted-foreground hover:text-primary"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Home</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Training Plans</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">AI Trainer</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Subscription</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to get the latest fitness tips and updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-muted border-0 rounded-l-md py-2 px-3 focus:ring-1 focus:ring-primary w-full"
              />
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-r-md px-4">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2023 Fitness Blueprint. All rights reserved. Created by Eng. Abdelrahman Emad</p>
        </div>
      </div>
    </footer>
  );
}
