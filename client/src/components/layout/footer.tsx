import Logo from "@/components/logo";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo />
              <span className="text-xl font-bold">
                Fitness<span className="text-primary">Blueprint</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered fitness platform with personalized workouts and nutrition advice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Site Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#workouts" className="text-gray-400 hover:text-primary">
                  Workouts
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-gray-400 hover:text-primary">
                  Schedule
                </a>
              </li>
              <li>
                <a href="#plans" className="text-gray-400 hover:text-primary">
                  Plans
                </a>
              </li>
              <li>
                <a href="#ai-chat" className="text-gray-400 hover:text-primary">
                  AI Trainer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Nutrition Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Exercise Library
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Progress Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-envelope text-primary mt-1 mr-2"></i>
                <a
                  href="mailto:contact@fitnessblueprint.ai"
                  className="text-gray-400 hover:text-primary"
                >
                  contact@fitnessblueprint.ai
                </a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt text-primary mt-1 mr-2"></i>
                <span className="text-gray-400">500 Fitness Ave., Cairo, Egypt</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone text-primary mt-1 mr-2"></i>
                <a href="tel:+201234567890" className="text-gray-400 hover:text-primary">
                  +20 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} FitnessBlueprint. Developed by Eng. Abdelrahman Emad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
