"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  onOrderPlaced?: (orderDetails: any) => void
}

export function OrderModal({ isOpen, onClose, onOrderPlaced }: OrderModalProps) {
  const [formStep, setFormStep] = useState(0)
  const [orderType, setOrderType] = useState<string | null>(null)
  const [filmType, setFilmType] = useState<string | null>(null)
  const [scanOptions, setScanOptions] = useState({
    resolution: "standard",
    digitalDelivery: true,
    printDelivery: false,
  })
  const [printOptions, setPrintOptions] = useState({
    size: "4x6",
    finish: "glossy",
    quantity: 1,
  })

  const nextStep = () => {
    setFormStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setFormStep((prev) => Math.max(0, prev - 1))
  }

  const handleModalClose = () => {
    onClose()
    // Reset form after a short delay to avoid visual jumps
    setTimeout(() => {
      setFormStep(0)
      setOrderType(null)
      setFilmType(null)
    }, 300)
  }

  const handlePlaceOrder = () => {
    // Collect all order details
    const orderDetails = {
      orderType,
      filmType,
      scanOptions: orderType === "film-development" || orderType === "scanning" ? scanOptions : null,
      printOptions: orderType === "printing" ? printOptions : null,
    }

    // Call the callback if provided
    if (onOrderPlaced) {
      onOrderPlaced(orderDetails)
    }

    // Close the modal
    handleModalClose()
  }

  // Form pages based on current step
  const renderFormContent = () => {
    switch (formStep) {
      case 0:
        return (
          <div className="space-y-6 w-full">
            <h3 className="text-lg font-medium text-center">What would you like to order?</h3>

            <RadioGroup value={orderType || ""} onValueChange={setOrderType} className="gap-3">
              <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                <RadioGroupItem value="film-development" id="film-development" />
                <Label htmlFor="film-development" className="flex-grow cursor-pointer">
                  Film Development & Scanning
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                <RadioGroupItem value="printing" id="printing" />
                <Label htmlFor="printing" className="flex-grow cursor-pointer">
                  Photo Printing
                </Label>
              </div>

              <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                <RadioGroupItem value="scanning" id="scanning" />
                <Label htmlFor="scanning" className="flex-grow cursor-pointer">
                  Scanning Only
                </Label>
              </div>
            </RadioGroup>

            <div className="pt-4 flex justify-end">
              <Button onClick={nextStep} disabled={!orderType} className="w-full sm:w-auto">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case 1:
        // Film type selection (for film development)
        if (orderType === "film-development" || orderType === "scanning") {
          return (
            <div className="space-y-6 w-full">
              <h3 className="text-lg font-medium text-center">Select your film type</h3>

              <RadioGroup value={filmType || ""} onValueChange={setFilmType} className="gap-3">
                <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                  <RadioGroupItem value="35mm-color" id="35mm-color" />
                  <Label htmlFor="35mm-color" className="flex-grow cursor-pointer">
                    35mm Color (C-41)
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                  <RadioGroupItem value="35mm-bw" id="35mm-bw" />
                  <Label htmlFor="35mm-bw" className="flex-grow cursor-pointer">
                    35mm Black & White
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                  <RadioGroupItem value="120-color" id="120-color" />
                  <Label htmlFor="120-color" className="flex-grow cursor-pointer">
                    120 Medium Format (Color)
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-primary/50 hover:bg-primary/5 cursor-pointer">
                  <RadioGroupItem value="120-bw" id="120-bw" />
                  <Label htmlFor="120-bw" className="flex-grow cursor-pointer">
                    120 Medium Format (B&W)
                  </Label>
                </div>
              </RadioGroup>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep} disabled={!filmType}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        }

        // Photo upload for printing
        if (orderType === "printing") {
          return (
            <div className="space-y-6 w-full">
              <h3 className="text-lg font-medium text-center">Upload your photos</h3>

              <div className="border-2 border-dashed border-border/60 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="h-10 w-10 text-muted-foreground mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop your photos here</p>
                  <p className="text-xs text-muted-foreground mb-4">or click to browse files</p>
                  <Button variant="outline" size="sm">
                    Select Files
                  </Button>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        }

        return null

      case 2:
        // Scanning options (for film development)
        if (orderType === "film-development" || orderType === "scanning") {
          return (
            <div className="space-y-6 w-full">
              <h3 className="text-lg font-medium text-center">Scanning Options</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Resolution</Label>
                  <RadioGroup
                    value={scanOptions.resolution}
                    onValueChange={(value) => setScanOptions({ ...scanOptions, resolution: value })}
                    className="gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard (2000 × 3000 px)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high">High (3000 × 4500 px)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ultra" id="ultra" />
                      <Label htmlFor="ultra">Ultra (6000 × 9000 px)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="digital"
                        checked={scanOptions.digitalDelivery}
                        onCheckedChange={(checked) =>
                          setScanOptions({ ...scanOptions, digitalDelivery: checked as boolean })
                        }
                      />
                      <Label htmlFor="digital">Digital delivery (download link)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="prints"
                        checked={scanOptions.printDelivery}
                        onCheckedChange={(checked) =>
                          setScanOptions({ ...scanOptions, printDelivery: checked as boolean })
                        }
                      />
                      <Label htmlFor="prints">Print delivery (4×6 prints)</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        }

        // Print options for printing
        if (orderType === "printing") {
          return (
            <div className="space-y-6 w-full">
              <h3 className="text-lg font-medium text-center">Print Options</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Print Size</Label>
                  <RadioGroup
                    value={printOptions.size}
                    onValueChange={(value) => setPrintOptions({ ...printOptions, size: value })}
                    className="gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4x6" id="4x6" />
                      <Label htmlFor="4x6">4×6 inches</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5x7" id="5x7" />
                      <Label htmlFor="5x7">5×7 inches</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="8x10" id="8x10" />
                      <Label htmlFor="8x10">8×10 inches</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Paper Finish</Label>
                  <RadioGroup
                    value={printOptions.finish}
                    onValueChange={(value) => setPrintOptions({ ...printOptions, finish: value })}
                    className="gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="glossy" id="glossy" />
                      <Label htmlFor="glossy">Glossy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="matte" id="matte" />
                      <Label htmlFor="matte">Matte</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pearl" id="pearl" />
                      <Label htmlFor="pearl">Pearl</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPrintOptions({
                          ...printOptions,
                          quantity: Math.max(1, printOptions.quantity - 1),
                        })
                      }
                    >
                      -
                    </Button>
                    <span className="mx-4">{printOptions.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPrintOptions({
                          ...printOptions,
                          quantity: printOptions.quantity + 1,
                        })
                      }
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )
        }

        return null

      case 3:
        // Order summary and confirmation
        return (
          <div className="space-y-6 w-full">
            <h3 className="text-lg font-medium text-center">Order Summary</h3>

            <div className="space-y-4 border rounded-md p-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Service</span>
                <span>
                  {orderType === "film-development"
                    ? "Film Development & Scanning"
                    : orderType === "scanning"
                      ? "Scanning Only"
                      : "Photo Printing"}
                </span>
              </div>

              {(orderType === "film-development" || orderType === "scanning") && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Film Type</span>
                    <span>
                      {filmType === "35mm-color"
                        ? "35mm Color (C-41)"
                        : filmType === "35mm-bw"
                          ? "35mm Black & White"
                          : filmType === "120-color"
                            ? "120 Medium Format (Color)"
                            : "120 Medium Format (B&W)"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Scan Resolution</span>
                    <span>
                      {scanOptions.resolution === "standard"
                        ? "Standard"
                        : scanOptions.resolution === "high"
                          ? "High"
                          : "Ultra"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {scanOptions.digitalDelivery && scanOptions.printDelivery
                        ? "Digital + Prints"
                        : scanOptions.digitalDelivery
                          ? "Digital Only"
                          : "Prints Only"}
                    </span>
                  </div>
                </>
              )}

              {orderType === "printing" && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Print Size</span>
                    <span>{printOptions.size}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Paper Finish</span>
                    <span>
                      {printOptions.finish === "glossy"
                        ? "Glossy"
                        : printOptions.finish === "matte"
                          ? "Matte"
                          : "Pearl"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Quantity</span>
                    <span>{printOptions.quantity}</span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center pt-2 border-t font-medium">
                <span>Estimated Price</span>
                <span>$24.99</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button onClick={handlePlaceOrder}>
                Place Order
                <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Get the appropriate title based on the current step and order type
  const getDialogTitle = () => {
    if (formStep === 0) return "Place an Order"
    if (formStep === 3) return "Review Your Order"

    if (orderType === "film-development") {
      return formStep === 1 ? "Film Selection" : "Scanning Options"
    }

    if (orderType === "scanning") {
      return formStep === 1 ? "Film Selection" : "Scanning Options"
    }

    if (orderType === "printing") {
      return formStep === 1 ? "Upload Photos" : "Print Options"
    }

    return "Place an Order"
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {formStep === 0 && "Select the service you need for your film or photos."}
            {formStep === 3 && "Review your order details before submitting."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-2">
          {/* Step indicator */}
          <div className="w-full mb-6 flex justify-between">
            {[0, 1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                    ${formStep === step
                      ? "bg-primary text-primary-foreground"
                      : formStep > step
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                >
                  {formStep > step ? <Check className="h-3 w-3" /> : step + 1}
                </div>
                {step < 3 && (
                  <div
                    className={`h-[1px] w-12 mt-3
                      ${formStep > step ? "bg-primary/50" : "bg-border"}`}
                    style={{ marginLeft: step === 3 ? "0" : "24px" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Dynamic form content based on step */}
          {renderFormContent()}
        </div>
      </DialogContent>
    </Dialog>
  )
}

