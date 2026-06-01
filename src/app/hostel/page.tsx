"use client";
import { useState } from "react";
import { useAdmissionStore } from "@/store/admissionStore";

// ─── Static Data ─────────────────────────────────────────────────────────────
const HOSTELS = [
  {
    id: 1, name: "Moremi Hall", type: "Female Hostel", color: "bg-pink-600",
    totalBeds: 320, availableBeds: 45, fee: 45000, blocks: ["Block A", "Block B"],
    amenities: ["WiFi", "Running Water", "24hr Power", "Security", "Study Room", "Canteen"],
    status: "available", tag: "On Sale Pay",
  },
  {
    id: 2, name: "Awolowo Hall", type: "Male Hostel", color: "bg-teal-600",
    totalBeds: 280, availableBeds: 12, fee: 45000, blocks: ["Block A", "Block B", "Block C"],
    amenities: ["WiFi", "Running Water", "24hr Power", "Security", "Canteen"],
    status: "filling", tag: "Filling Up",
  },
  {
    id: 3, name: "Matters Hall", type: "Female Hostel", color: "bg-slate-600",
    totalBeds: 200, availableBeds: 0, fee: 45000, blocks: ["Block A", "Block B"],
    amenities: ["Running Water", "Security", "Study Room"],
    status: "full", tag: "Full",
  },
  {
    id: 4, name: "Queen Hall", type: "Female Hostel", color: "bg-purple-600",
    totalBeds: 240, availableBeds: 80, fee: 45000, blocks: ["Block A", "Block B"],
    amenities: ["WiFi", "Running Water", "24hr Power", "Security", "Canteen", "Laundry"],
    status: "available", tag: "Book Now",
  },
  {
    id: 5, name: "Independence Hall", type: "Male Hostel", color: "bg-emerald-600",
    totalBeds: 350, availableBeds: 95, fee: 45000, blocks: ["Block A", "Block B", "Block C", "Block D"],
    amenities: ["WiFi", "Running Water", "24hr Power", "Security", "Study Room", "Canteen", "Laundry"],
    status: "available", tag: "Book Now",
  },
  {
    id: 6, name: "ETF Hostel", type: "Mixed Hostel", color: "bg-blue-700",
    totalBeds: 180, availableBeds: 30, fee: 45000, blocks: ["Block A", "Block B"],
    amenities: ["WiFi", "Running Water", "Security"],
    status: "available", tag: "Book Now",
  },
];

const ROOMS: Record<string, { id: string; beds: number; available: number; status: string }[]> = {
  "Block A": [
    { id: "A101", beds: 6, available: 4, status: "available" },
    { id: "A102", beds: 6, available: 6, status: "available" },
    { id: "A103", beds: 4, available: 2, status: "partial" },
    { id: "A104", beds: 6, available: 0, status: "full" },
    { id: "A105", beds: 4, available: 3, status: "available" },
    { id: "A106", beds: 6, available: 0, status: "full" },
    { id: "A107", beds: 4, available: 1, status: "partial" },
    { id: "A108", beds: 6, available: 6, status: "available" },
  ],
  "Block B": [
    { id: "B101", beds: 6, available: 5, status: "available" },
    { id: "B102", beds: 4, available: 0, status: "full" },
    { id: "B103", beds: 6, available: 3, status: "partial" },
    { id: "B104", beds: 4, available: 4, status: "available" },
  ],
  "Block C": [
    { id: "C101", beds: 6, available: 6, status: "available" },
    { id: "C102", beds: 4, available: 2, status: "partial" },
    { id: "C103", beds: 6, available: 0, status: "full" },
    { id: "C104", beds: 4, available: 4, status: "available" },
  ],
};

const statusColor: Record<string, string> = {
  available: "bg-green-500",
  full: "bg-red-500",
  filling: "bg-amber-500",
};

const tagColor: Record<string, string> = {
  "On Sale Pay": "bg-green-500",
  "Filling Up": "bg-amber-500",
  "Full": "bg-red-500",
  "Book Now": "bg-green-500",
};

// ─── Types ────────────────────────────────────────────────────────────────────
type Hostel = typeof HOSTELS[0];
type BookingStep = 1 | 2 | 3 | 4;

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HostelPage() {
  const [view, setView] = useState<"dashboard" | "browse" | "booking" | "allocation" | "maintenance" | "payment">("dashboard");
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [modalHostel, setModalHostel] = useState<Hostel | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);
  const [selectedBlock, setSelectedBlock] = useState("Block A");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedBed, setSelectedBed] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [maintenanceModal, setMaintenanceModal] = useState(false);
  const [newRequest, setNewRequest] = useState({ category: "", priority: "Medium", location: "My Room", description: "" });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const allocated = {
    hostel: "Moremi Hall", block: "Block A", room: "A101", bed: 3,
    floor: "3rd Floor", checkIn: "10 Jan 2025", checkOut: "31 Aug 2025", status: "Paid",
  };

  const maintenanceRequests = [
    { date: "14 Jan 2025", issue: "Broken door lock", location: "Room A101", priority: "Medium", status: "In Progress" },
    { date: "5 Jan 2025", issue: "Leaking ceiling", location: "Bathroom", priority: "Urgent", status: "Resolved" },
    { date: "10 Dec 2024", issue: "Faulty power socket", location: "Room A101", priority: "Medium", status: "Resolved" },
  ];

  // Sidebar nav for hostel
  const hostelNav = [
    { label: "Dashboard", view: "dashboard" },
    { label: "Browse Hostels", view: "browse" },
    { label: "My Allocation", view: "allocation" },
    { label: "Hostel Payment", view: "payment" },
    { label: "Maintenance", view: "maintenance" },
  ];

  return (
    <div className="flex gap-6">
      {/* Hostel Sub-Sidebar */}
      <aside className="w-48 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-[#0D1B35] px-4 py-3">
            <p className="text-[10px] font-bold tracking-widest text-[#C9922A] uppercase">Hostel Menu</p>
          </div>
          <nav className="p-2 space-y-0.5">
            {hostelNav.map(item => (
              <button key={item.view}
                onClick={() => { setView(item.view as any); setSelectedHostel(null); setBookingStep(1); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all
                  ${view === item.view ? "bg-[#C9922A]/10 text-[#C9922A] border border-[#C9922A]/20" : "text-gray-600 hover:bg-gray-50"}`}>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">

        {/* ── DASHBOARD ── */}
        {view === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#0D1B35]">Welcome back, <span className="text-[#C9922A]">Olusaseun</span> 🏠</h2>
                <p className="text-gray-400 text-sm">2024/2025 Session — Bed space booking is now open</p>
              </div>
              <button 
                onClick={() => { setView("booking"); setBookingStep(1); setSelectedHostel(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-[#0D1B35] text-white rounded-xl text-sm font-bold hover:bg-[#1a2f5e] transition-all">
                🏠 Book a Bed Space
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Available Hostels", value: "6", sub: "Female · 3 Male · 3 Mixed · 1" },
                { label: "Bed Available", value: "246", sub: "Out of 800 total available" },
                { label: "Hostel Fee", value: "₦45,000", sub: "Per session · This Session fee" },
                { label: "Booking Deadline", value: "Jan 31", sub: "15 days remaining" },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0D1B35] mt-1">{stat.value}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Alert */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-amber-500 text-lg">🏠</span>
                <div>
                  <p className="text-xs font-bold text-amber-800">Bed Space Booking Now Open — 2024/2025</p>
                  <p className="text-[11px] text-amber-600">Complete your payment first, then select your preferred hall, block, and bed number. First come, first served.</p>
                </div>
              </div>
              <button onClick={() => { setView("booking"); setBookingStep(1); setSelectedHostel(null); }}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600 transition-all whitespace-nowrap">
                Apply Now →
              </button>
            </div>

            {/* How to get bed space */}
            <div>
              <h3 className="text-sm font-bold text-[#0D1B35] mb-3">How to Get a Bed Space</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { step: 1, icon: "💰", title: "Pay Hostel fee", desc: "Pay the hostel accommodation fee for the session" },
                  { step: 2, icon: "🏠", title: "Choose Hostel", desc: "Browse and select your preferred hostel" },
                  { step: 3, icon: "🛏", title: "Pick a Bed", desc: "Select from available beds in your preferred room" },
                  { step: 4, icon: "✅", title: "Get Allocated", desc: "Receive your official hostel allocation letter" },
                ].map(s => (
                  <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <p className="text-xs font-bold text-[#0D1B35]">{s.step}. {s.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Hostels */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#0D1B35]">Featured Hostels</h3>
                <button onClick={() => setView("browse")} className="text-xs text-[#C9922A] font-bold hover:underline">Browse All →</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {HOSTELS.slice(0, 3).map(hostel => (
                  <HostelCard key={hostel.id} hostel={hostel}
                    onView={() => setModalHostel(hostel)}
                    onBook={() => { setSelectedHostel(null); setView("booking"); setBookingStep(1); }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BROWSE ── */}
        {view === "browse" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0D1B35]">Browse <span className="text-[#C9922A]">Hostels</span></h2>
                <p className="text-gray-400 text-xs">All on-campus accommodation options for 2024/2025</p>
              </div>
              {bookingStep > 1 && (
                <button onClick={() => setView("booking")}
                  className="px-4 py-2 bg-[#0D1B35] text-white rounded-xl text-xs font-bold">
                  Continue Booking →
                </button>
              )}
            </div>

            {/* Booking Steps */}
            <BookingSteps current={bookingStep} />

            <div className="grid grid-cols-3 gap-4">
              {HOSTELS.map(hostel => (
                <HostelCard key={hostel.id} hostel={hostel}
                  onView={() => setModalHostel(hostel)}
                  onBook={() => { setSelectedHostel(hostel); setView("booking"); setBookingStep(1); }} />
              ))}
            </div>
          </div>
        )}

        {/* ── BOOKING ── */}
        {view === "booking" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-[#0D1B35]">Book a <span className="text-[#C9922A]">Bed space</span></h2>
              <p className="text-gray-400 text-xs">Follow the steps to secure your accommodation</p>
            </div>

            <BookingSteps current={bookingStep} />

            {/* Step 1 — Personal Info */}
{bookingStep === 1 && (
  <PersonalInfoStep
    onContinue={() => {
      if (selectedHostel) {
        setBookingStep(3); // hostel already selected hai browse se
      } else {
        setBookingStep(2); // hostel select karna hai
      }
    }}
  />
)}

            {/* Step 2 — Choose Hostel */}
            {bookingStep === 2 && (
              <div className="grid grid-cols-3 gap-4">
                {HOSTELS.filter(h => h.status !== "full").map(hostel => (
                  <HostelCard key={hostel.id} hostel={hostel}
                    onView={() => setModalHostel(hostel)}
                    onBook={() => { setSelectedHostel(hostel); setBookingStep(3); }} />
                ))}
              </div>
            )}

            {/* Step 3 — Pick Room & Bed */}
            {bookingStep === 3 && selectedHostel && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-[#0D1B35] px-6 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold">{selectedHostel.name}</h3>
                    <p className="text-gray-400 text-xs">Select your room then your preferred bed number</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400">Selected Hostel</p>
                    <p className="text-[#C9922A] text-xs font-bold">Change a hostel building</p>
                  </div>
                </div>

                {/* Block Tabs */}
                <div className="px-6 pt-4 flex gap-2">
                  {selectedHostel.blocks.map(block => (
                    <button key={block} onClick={() => { setSelectedBlock(block); setSelectedRoom(null); setSelectedBed(null); }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all
                        ${selectedBlock === block ? "bg-[#0D1B35] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                      {block}
                    </button>
                  ))}
                </div>

                {/* Rooms Grid */}
                <div className="p-6 grid grid-cols-4 gap-3">
                  {(ROOMS[selectedBlock] || ROOMS["Block A"]).map(room => (
                    <button key={room.id} onClick={() => { if (room.status !== "full") { setSelectedRoom(room.id); setSelectedBed(null); } }}
                      className={`p-3 rounded-xl border-2 text-left transition-all
                        ${selectedRoom === room.id ? "border-[#C9922A] bg-amber-50" :
                          room.status === "full" ? "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed" :
                          "border-gray-200 hover:border-[#C9922A] bg-white"}`}>
                      <p className="text-xs font-bold text-[#0D1B35]">{room.id}</p>
                      <p className="text-[10px] text-gray-400">{room.beds} beds</p>
                      <div className="flex gap-0.5 mt-1 flex-wrap">
                        {Array.from({ length: room.beds }).map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-sm ${i < (room.beds - room.available) ? "bg-red-300" : "bg-green-300"}`} />
                        ))}
                      </div>
                      <p className={`text-[9px] font-bold mt-1 ${room.status === "full" ? "text-red-500" : "text-green-600"}`}>
                        {room.status === "full" ? "Full" : `${room.available} free`}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="px-6 pb-2 flex gap-4">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-300" /><span className="text-[10px] text-gray-500">Available</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-300" /><span className="text-[10px] text-gray-500">Taken</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-amber-300" /><span className="text-[10px] text-gray-500">Your Selection</span></div>
                </div>

                {/* Bed Selection */}
                {selectedRoom && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-xs font-bold text-[#0D1B35] mb-1">Room {selectedRoom} — Choose your bed</p>
                      <p className="text-[10px] text-gray-400 mb-3">4 beds available</p>
                      <div className="grid grid-cols-4 gap-3">
                        {[1, 2, 3, 4].map(bed => (
                          <button key={bed} onClick={() => setSelectedBed(bed)}
                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                              ${selectedBed === bed ? "border-[#C9922A] bg-amber-50" : "border-gray-200 hover:border-[#C9922A] bg-white"}`}>
                            <span className="text-2xl">🛏</span>
                            <span className="text-[10px] font-bold text-gray-600">Bed {bed}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold
                              ${selectedBed === bed ? "bg-[#C9922A] text-white" : "bg-green-100 text-green-700"}`}>
                              {selectedBed === bed ? "Selected" : "Available"}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="px-6 pb-6 flex justify-between">
                  <button onClick={() => { setSelectedHostel(null); setBookingStep(2); }}
                    className="px-6 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:border-[#C9922A] transition-all">
                    Back
                  </button>
                  <button
                    onClick={() => { if (selectedRoom && selectedBed) setBookingStep(4); }}
                    disabled={!selectedRoom || !selectedBed}
                    className="px-8 py-2.5 bg-[#0E9F6E] text-white rounded-xl text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0a8a5e] transition-all">
                    Next: Confirm →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 — Confirm & Pay */}
            {bookingStep === 4 && selectedHostel && (
              <div className="grid grid-cols-2 gap-5">
                {/* Booking Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                  <h3 className="font-bold text-[#0D1B35] text-sm">Booking Summary</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { label: "Hostel", value: selectedHostel.name },
                      { label: "Room", value: selectedRoom || "—" },
                      { label: "Location", value: `${selectedBlock}` },
                      { label: "Bed Number", value: `Bed ${selectedBed}` },
                      { label: "Session", value: "2024/2025" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-400">{label}</span>
                        <span className="font-semibold text-[#0D1B35]">{value}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-100 pt-3 bg-amber-50 rounded-xl px-4 py-3">
                      <p className="text-[10px] text-gray-400">Total Amount</p>
                      <p className="text-2xl font-bold text-[#0D1B35]">₦45,000</p>
                      <p className="text-[10px] text-gray-400">Inclusive of all charges</p>
                    </div>
                    <div className="space-y-1 text-[10px] text-gray-500">
                      <div className="flex justify-between"><span>Bed Space Fee</span><span>₦40,000</span></div>
                      <div className="flex justify-between"><span>Caution Deposit</span><span>₦3,000</span></div>
                      <div className="flex justify-between"><span>Admin Charges</span><span>₦2,000</span></div>
                    </div>
                  </div>
                  <textarea placeholder="Special needs or accessibility requirements..."
                    className="w-full text-xs border border-gray-200 rounded-lg p-3 resize-none h-16 focus:outline-none focus:border-[#C9922A]" />
                 <div className="flex flex-col gap-1">
  <label className="flex items-start gap-2 cursor-pointer group">
    <div
      onClick={() => {
        setTermsAccepted(!termsAccepted);
        setTermsError(false);
      }}
      className={`w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer
        ${termsAccepted
          ? "bg-[#C9922A] border-[#C9922A]"
          : termsError
            ? "border-red-400"
            : "bg-white border-gray-300 group-hover:border-[#C9922A]"}`}>
      {termsAccepted && <span className="text-white text-xs font-bold">✓</span>}
    </div>
    <span className="text-[10px] text-gray-500">
      I agree to the hostel terms and conditions, including the policy on conduct, damages, and early checkout charges.
    </span>
  </label>
  {termsError && (
    <p className="text-[11px] text-red-500 ml-7">⚠ You must agree to the terms before proceeding</p>
  )}
</div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                  <h3 className="font-bold text-[#0D1B35] text-sm">Payment Method</h3>
                  <div className="space-y-2">
                    {[
                      { id: "wallet", label: "Wallet Balance", sub: "Balance: ₦12,000", icon: "💳" },
                      { id: "card", label: "Bank Card", sub: "Debit or Credit card", icon: "🏧" },
                      { id: "transfer", label: "Bank Transfer", sub: "Direct bank transfer", icon: "🏦" },
                      { id: "ussd", label: "USSD", sub: "*737# or *770#", icon: "📱" },
                    ].map(method => (
                      <button key={method.id} onClick={() => setPaymentMethod(method.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all
                          ${paymentMethod === method.id ? "border-[#C9922A] bg-amber-50" : "border-gray-200 hover:border-gray-300"}`}>
                        <span>{method.icon}</span>
                        <div>
                          <p className="text-xs font-bold text-[#0D1B35]">{method.label}</p>
                          <p className="text-[10px] text-gray-400">{method.sub}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <p className="text-[10px] text-gray-400 bg-gray-50 rounded-lg p-3">
                    Secure booking: Your bed space will be reserved immediately upon payment confirmation. You will receive an allocation letter within 24 hours.
                  </p>

                  <div className="flex gap-3">
                    <button onClick={() => setBookingStep(3)}
                      className="px-4 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:border-[#C9922A] transition-all">
                      Back
                    </button>
                    <button
  onClick={() => {
    if (!termsAccepted) {
      setTermsError(true);
      return;
    }
    setView("allocation");
  }}
  disabled={!paymentMethod}
  className="flex-1 py-2.5 bg-[#0E9F6E] text-white rounded-xl text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0a8a5e] transition-all">
  Confirm & Pay ₦45,000
</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── MY ALLOCATION ── */}
        {view === "allocation" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0D1B35]">My <span className="text-[#C9922A]">Allocation</span></h2>
                <p className="text-gray-400 text-xs">Your confirmed hostel accommodation details</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:border-[#C9922A] transition-all">Download Letter</button>
                <button className="px-4 py-2 bg-[#0D1B35] text-white rounded-xl text-xs font-bold">Print</button>
              </div>
            </div>

            <div className="bg-[#0D1B35] rounded-2xl p-6 text-white">
              <p className="text-[10px] text-[#C9922A] uppercase tracking-widest font-bold mb-1">Your Accommodation — 2024/2025 Session</p>
              <h3 className="text-2xl font-bold">{allocated.hostel}</h3>
              <p className="text-gray-400 text-sm">{allocated.block} · Room {allocated.room} · Bed {allocated.bed} · {allocated.floor}</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400">Check In</p>
                  <p className="font-bold text-sm">{allocated.checkIn}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400">Check Out</p>
                  <p className="font-bold text-sm">{allocated.checkOut}</p>
                </div>
                <div className="bg-green-500/20 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400">Payment Status</p>
                  <p className="font-bold text-sm text-green-400">✓ {allocated.status}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Allocation Letter */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-[#0D1B35] mb-4">Official Allocation Letter</h3>
                <div className="border border-gray-200 rounded-xl p-4 text-xs text-gray-600 space-y-2">
                  <p className="font-bold text-center text-[#0D1B35]">UNIVERSITY OF OFFA</p>
                  <p className="text-center text-[10px] text-gray-400">HOSTEL ALLOCATION LETTER</p>
                  <hr className="border-gray-100" />
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between"><span className="text-gray-400">Hostel:</span><span className="font-semibold">Moremi Hall</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Block:</span><span className="font-semibold">Block A</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Room:</span><span className="font-semibold">A101</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Bed:</span><span className="font-semibold">Bed 3</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Session:</span><span className="font-semibold">2024/2025</span></div>
                  </div>
                  <hr className="border-gray-100" />
                  <p className="text-[10px] text-gray-400">D.A Eki · Bursary Admin · 15 Jan 2025</p>
                </div>
              </div>

              {/* Amenities & Activity Log */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-sm font-bold text-[#0D1B35] mb-3">Hostel Info & Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {["WiFi Access", "Running water", "24hr power", "24hr Security", "Study Room", "Canteen", "Laundry"].map(a => (
                      <span key={a} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">{a}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="text-sm font-bold text-[#0D1B35] mb-3">Activities Log</h3>
                  <div className="space-y-2">
                    {[
                      { icon: "✅", text: "Bed Allocated — Room A101 · Bed 3", date: "10 Jan 2025" },
                      { icon: "💳", text: "Payment Confirmed — ₦45,000", date: "10 Jan 2025" },
                      { icon: "📝", text: "Application Submitted", date: "9 Jan 2025" },
                    ].map((log, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <span>{log.icon}</span>
                        <div>
                          <p className="text-gray-700 font-semibold">{log.text}</p>
                          <p className="text-gray-400 text-[10px]">{log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PAYMENT ── */}
        {view === "payment" && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-[#0D1B35]">Hostel <span className="text-[#C9922A]">Payment</span></h2>
              <p className="text-gray-400 text-xs">Manage your hostel fee payment</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h3 className="font-bold text-[#0D1B35] text-sm">Fee Summary</h3>
                <div className="bg-amber-50 rounded-xl p-4 text-center">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total Hostel Fee</p>
                  <p className="text-3xl font-bold text-[#0D1B35] mt-1">45,000</p>
                  <p className="text-[10px] text-amber-600 mt-1">Inclusive of all charges</p>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Bed Space Fee", value: "₦40,000" },
                    { label: "Caution Deposit", value: "₦3,000" },
                    { label: "Admin Charges", value: "₦2,000" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-gray-600">
                      <span>{label}</span><span className="font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 bg-[#C9922A] text-white rounded-xl text-sm font-bold hover:bg-[#b07d20] transition-all">
                  Pay ₦45,000 Now
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-[#0D1B35] text-sm mb-4">Payment History</h3>
                <div className="space-y-0 text-xs">
                  <div className="grid grid-cols-4 gap-2 pb-2 border-b border-gray-100 text-[10px] text-gray-400 font-bold uppercase">
                    <span>Date</span><span>Description</span><span>Amount</span><span>Status</span>
                  </div>
                  {[
                    { date: "10 Jan 2025", desc: "Hostel Fee 2024/2025", amount: "₦45,000", status: "Paid" },
                    { date: "12 Jan 2024", desc: "Hostel Fee 2023/2024", amount: "₦40,000", status: "Paid" },
                  ].map((p, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 py-3 border-b border-gray-50 text-xs">
                      <span className="text-gray-500">{p.date}</span>
                      <span className="text-gray-700">{p.desc}</span>
                      <span className="font-semibold text-[#0D1B35]">{p.amount}</span>
                      <span className="text-green-600 font-bold text-[10px]">✓ {p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MAINTENANCE ── */}
        {view === "maintenance" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0D1B35]">Maintenance <span className="text-[#C9922A]">Requests</span></h2>
                <p className="text-gray-400 text-xs">Report issues in your room or hostel</p>
              </div>
              <button onClick={() => setMaintenanceModal(true)}
                className="px-4 py-2 bg-[#0D1B35] text-white rounded-xl text-xs font-bold hover:bg-[#1a2f5e] transition-all">
                + New Request
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <h3 className="text-xs font-bold text-[#0D1B35]">My Requests</h3>
              </div>
              <div className="divide-y divide-gray-50">
                <div className="grid grid-cols-5 gap-4 px-6 py-2 text-[10px] font-bold text-gray-400 uppercase">
                  <span>Date</span><span>Issue</span><span>Location</span><span>Priority</span><span>Status</span>
                </div>
                {maintenanceRequests.map((req, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4 px-6 py-4 text-xs items-center">
                    <span className="text-gray-400">{req.date}</span>
                    <span className="text-gray-700 font-semibold">{req.issue}</span>
                    <span className="text-gray-500">{req.location}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold w-fit
                      ${req.priority === "Urgent" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
                      {req.priority}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold w-fit
                      ${req.status === "Resolved" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hostel Detail Modal */}
      {modalHostel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className={`${modalHostel.color} p-8 flex items-center justify-center`}>
              <span className="text-5xl">🏠</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#0D1B35] text-lg">{modalHostel.name}</h3>
                <button onClick={() => setModalHostel(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { label: "Hostel Type", value: modalHostel.type },
                  { label: "Capacity", value: `${modalHostel.totalBeds} bed spaces` },
                  { label: "Beds Available", value: `${modalHostel.availableBeds} free` },
                  { label: "Annual Fee", value: `₦${modalHostel.fee.toLocaleString()}` },
                  { label: "Total Blocks", value: `${modalHostel.blocks.length} block${modalHostel.blocks.length > 1 ? "s" : ""}` },
                  { label: "Blocks", value: modalHostel.blocks.join(", ") },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider">{label}</p>
                    <p className="font-semibold text-[#0D1B35]">{value}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Amenities</p>
                <div className="flex flex-wrap gap-1.5">
                  {modalHostel.amenities.map(a => (
                    <span key={a} className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-semibold">{a}</span>
                  ))}
                </div>
              </div>
              {modalHostel.availableBeds > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                  <p className="text-xs text-green-700 font-semibold">✓ {modalHostel.availableBeds} bed spaces available for booking</p>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setModalHostel(null)}
                  className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:border-[#C9922A] transition-all">
                  Close
                </button>
                {modalHostel.status !== "full" && (
                  <button onClick={() => { setModalHostel(null); setView("booking"); setBookingStep(1); }}
                    className="flex-1 py-2.5 bg-[#0E9F6E] text-white rounded-xl text-sm font-bold hover:bg-[#0a8a5e] transition-all">
                    Book This Hostel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Modal */}
      {maintenanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-[#0D1B35] px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold">New Maintenance Request</h3>
                <p className="text-gray-400 text-[10px]">Room A101 · Moremi Hall</p>
              </div>
              <button onClick={() => setMaintenanceModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">Issue Category</label>
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9922A]"
                  value={newRequest.category} onChange={e => setNewRequest({ ...newRequest, category: e.target.value })}>
                  <option value="">-- Select Category --</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Structural</option>
                  <option>Furniture</option>
                  <option>Security</option>
                  <option>Cleaning</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">Priority Level</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9922A]"
                    value={newRequest.priority} onChange={e => setNewRequest({ ...newRequest, priority: e.target.value })}>
                    <option>Low</option><option>Medium</option><option>Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">Location</label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9922A]"
                    value={newRequest.location} onChange={e => setNewRequest({ ...newRequest, location: e.target.value })}>
                    <option>My Room (A101)</option><option>Bathroom</option><option>Common Area</option><option>Corridor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">Description</label>
                <textarea placeholder="Description the issue clearly so our maintenance team can respond appropriately..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm resize-none h-24 focus:outline-none focus:border-[#C9922A]"
                  value={newRequest.description} onChange={e => setNewRequest({ ...newRequest, description: e.target.value })} />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setMaintenanceModal(false)}
                  className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:border-[#C9922A] transition-all">
                  Cancel
                </button>
                <button onClick={() => setMaintenanceModal(false)}
                  className="flex-1 py-2.5 bg-[#0E9F6E] text-white rounded-xl text-sm font-bold hover:bg-[#0a8a5e] transition-all">
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Reusable Components ──────────────────────────────────────────────────────
function HostelCard({ hostel, onView, onBook }: { hostel: typeof HOSTELS[0]; onView: () => void; onBook: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className={`${hostel.color} h-28 flex items-center justify-center relative`}>
        <span className="text-4xl">🏠</span>
        <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white ${tagColor[hostel.tag] || "bg-gray-500"}`}>
          {hostel.tag}
        </span>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-bold text-[#0D1B35] text-sm">{hostel.name}</h4>
        <div className="flex gap-3 text-[10px] text-gray-400">
          <span>🏠 {hostel.type}</span>
          <span>👥 {hostel.totalBeds} beds</span>
          <span>✓ {hostel.availableBeds} free</span>
        </div>
        <p className="text-sm font-bold text-[#C9922A]">₦{hostel.fee.toLocaleString()}<span className="text-[10px] text-gray-400 font-normal">/session</span></p>
        <div className="flex gap-3 text-[10px] text-gray-400">
          <span>{hostel.blocks.length} blocks</span>
          <span>{hostel.amenities.length} amenities</span>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onView}
            className="flex-1 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold hover:border-[#C9922A] hover:text-[#C9922A] transition-all">
            View Details
          </button>
          <button onClick={onBook} disabled={hostel.status === "full"}
            className="flex-1 py-1.5 bg-[#0E9F6E] text-white rounded-lg text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0a8a5e] transition-all">
            {hostel.status === "full" ? "Full" : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingSteps({ current }: { current: number }) {
  const steps = [
    { id: 1, label: "Personal Info", sub: "Verified" },
    { id: 2, label: "Choose Hostel", sub: "Select building" },
    { id: 3, label: "Pick Room & Bed", sub: "Interactive map" },
    { id: 4, label: "Confirm & Pay", sub: "Complete booking" },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => {
          const done = step.id < current;
          const active = step.id === current;
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                  ${active ? "bg-[#C9922A] border-[#C9922A] text-white" :
                    done ? "bg-[#0E9F6E] border-[#0E9F6E] text-white" :
                    "bg-white border-gray-200 text-gray-400"}`}>
                  {done ? "✓" : step.id}
                </div>
                <div>
                  <p className={`text-xs font-bold ${active ? "text-[#C9922A]" : done ? "text-[#0E9F6E]" : "text-gray-400"}`}>{step.label}</p>
                  <p className="text-[10px] text-gray-400">{step.sub}</p>
                </div>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-[2px] mx-3 ${done ? "bg-[#0E9F6E]" : "bg-gray-100"}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function PersonalInfoStep({ onContinue }: { onContinue: () => void }) {
  const hasProfile = true;
  const validCredits = 7;

  const bioData = {
    passportPhoto: null,
    surname: "Ibrahim", firstName: "Fatimah", otherName: "Aisha",
    dateOfBirth: "2000-05-14", gender: "Female", maritalStatus: "Single",
    nationality: "Nigerian", stateOfOrigin: "Kwara", localGovtArea: "Offa",
    nin: "12345678981",
  };

  const contactData = {
    phoneNumber: "08012345678", emailAddress: "Fatimah@email.com",
    residentialAddress: "12, Harmony Street, Offa, Kwara State",
    guardianFullName: "Ibrahim Musa", guardianPhone: "08098765432",
  };

  const programmeData = {
    faculty: "Sciences", department: "Computer Science",
    modeOfEntry: "UTME", jambScore: "312",
  };

  return (
    <div className="space-y-5">
      {!hasProfile && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center gap-3">
          <span className="text-red-500 text-lg">⚠</span>
          <div>
            <p className="text-sm font-bold text-red-700">Profile Incomplete</p>
            <p className="text-xs text-red-500">Please complete your admission profile before booking a hostel.</p>
          </div>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-[#0D1B35] rounded-2xl p-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-xl border-2 border-[#C9922A]/40 overflow-hidden bg-[#C9922A]/10 flex items-center justify-center shrink-0">
          {bioData.passportPhoto ? (
            <img src={bioData.passportPhoto} className="w-full h-full object-cover" alt="passport" />
          ) : (
            <span className="text-3xl">👤</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-[10px] text-[#C9922A] font-bold tracking-widest uppercase mb-1">Student Profile</p>
          <h3 className="text-white font-bold text-xl">
            {bioData.surname && bioData.firstName
              ? `${bioData.surname} ${bioData.firstName}${bioData.otherName ? " " + bioData.otherName : ""}`
              : "—"}
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            {programmeData.faculty || "—"} · {programmeData.department || "—"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400">Admission Status</p>
          {hasProfile ? (
            <span className="text-[11px] bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-bold">✓ Verified</span>
          ) : (
            <span className="text-[11px] bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-bold">✗ Incomplete</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-5 py-3">
            <p className="text-[10px] font-bold tracking-widest text-[#0D1B35] uppercase">Personal Details</p>
          </div>
          <div className="p-5 space-y-3">
            {[
              { label: "Full Name", value: [bioData.surname, bioData.firstName, bioData.otherName].filter(Boolean).join(" ") || "—" },
              { label: "Date of Birth", value: bioData.dateOfBirth || "—" },
              { label: "Gender", value: bioData.gender || "—" },
              { label: "State of Origin", value: bioData.stateOfOrigin || "—" },
              { label: "LGA", value: bioData.localGovtArea || "—" },
              { label: "NIN", value: bioData.nin || "—" },
              { label: "Nationality", value: bioData.nationality || "—" },
              { label: "Marital Status", value: bioData.maritalStatus || "—" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-400 uppercase tracking-wider text-[10px]">{label}</span>
                <span className="font-semibold text-[#0D1B35]">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Contact Details */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3">
              <p className="text-[10px] font-bold tracking-widest text-[#0D1B35] uppercase">Contact Details</p>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Phone", value: contactData.phoneNumber || "—" },
                { label: "Email", value: contactData.emailAddress || "—" },
                { label: "Address", value: contactData.residentialAddress || "—" },
                { label: "Guardian", value: contactData.guardianFullName || "—" },
                { label: "Guardian Phone", value: contactData.guardianPhone || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-400 uppercase tracking-wider text-[10px] shrink-0">{label}</span>
                  <span className="font-semibold text-[#0D1B35] text-right ml-4 break-all">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Details */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3">
              <p className="text-[10px] font-bold tracking-widest text-[#0D1B35] uppercase">Academic Details</p>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Faculty", value: programmeData.faculty || "—" },
                { label: "Department", value: programmeData.department || "—" },
                { label: "Mode of Entry", value: programmeData.modeOfEntry || "—" },
                { label: "JAMB Score", value: programmeData.jambScore || "—" },
                { label: "O-Level Credits", value: validCredits > 0 ? `${validCredits} credits` : "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-gray-400 uppercase tracking-wider text-[10px]">{label}</span>
                  <span className="font-semibold text-[#0D1B35]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-between items-center pt-2">
        <p className="text-xs text-gray-400">
          {hasProfile
            ? "✓ All details verified from your admission profile"
            : "⚠ Complete your profile first to proceed"}
        </p>
        <button
          onClick={onContinue}
          disabled={!hasProfile}
          className="px-8 py-2.5 bg-[#0E9F6E] text-white rounded-xl text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0a8a5e] transition-all shadow-md shadow-green-100">
          Continue — Choose Hostel →
        </button>
      </div>
    </div>
  );
}