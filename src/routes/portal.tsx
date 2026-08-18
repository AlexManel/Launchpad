function PropertiesPanel({
  properties,
  loading,
  error,
  onPropertiesChange,
}: {
  properties: Property[];
  loading: boolean;
  error: string;
  onPropertiesChange: (properties: Property[]) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  const [bedConfiguration, setBedConfiguration] = useState("");
  const [livingRoom, setLivingRoom] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [bathroomDetails, setBathroomDetails] = useState("");

  const [amenities, setAmenities] = useState<string[]>([]);

  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [quietHours, setQuietHours] = useState("");

  const [smoking, setSmoking] = useState("not_specified");
  const [pets, setPets] = useState("not_specified");
  const [parties, setParties] = useState("not_specified");

  const [accessMethod, setAccessMethod] = useState("");
  const [checkInInstructions, setCheckInInstructions] = useState("");
  const [parkingInstructions, setParkingInstructions] = useState("");
  const [wifiNetwork, setWifiNetwork] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");

  const [neighborhood, setNeighborhood] = useState("");
  const [nearbyAttractions, setNearbyAttractions] = useState("");
  const [nearbyRestaurants, setNearbyRestaurants] = useState("");
  const [publicTransport, setPublicTransport] = useState("");
  const [importantLandmarks, setImportantLandmarks] = useState("");

  const [hostNotes, setHostNotes] = useState("");

  const propertyTypes = [
    ["apartment", "Apartment"],
    ["house", "House"],
    ["villa", "Villa"],
    ["studio", "Studio"],
    ["loft", "Loft"],
    ["cabin", "Cabin"],
    ["room", "Room"],
    ["other", "Other"],
  ];

  const amenityOptions = [
    ["wifi", "Wi-Fi"],
    ["air_conditioning", "Air conditioning"],
    ["heating", "Heating"],
    ["tv", "TV"],
    ["washing_machine", "Washing machine"],
    ["dishwasher", "Dishwasher"],
    ["coffee_machine", "Coffee machine"],
    ["iron", "Iron"],
    ["hair_dryer", "Hair dryer"],
    ["parking", "Parking"],
    ["balcony", "Balcony"],
    ["elevator", "Elevator"],
  ];

  const resetForm = () => {
    setPropertyName("");
    setPropertyType("apartment");
    setAddress("");
    setCity("");
    setCountry("");
    setDescription("");

    setBedrooms("");
    setBathrooms("");
    setMaxGuests("");

    setBedConfiguration("");
    setLivingRoom("");
    setKitchen("");
    setBathroomDetails("");

    setAmenities([]);

    setCheckInTime("");
    setCheckOutTime("");
    setQuietHours("");

    setSmoking("not_specified");
    setPets("not_specified");
    setParties("not_specified");

    setAccessMethod("");
    setCheckInInstructions("");
    setParkingInstructions("");
    setWifiNetwork("");
    setWifiPassword("");

    setNeighborhood("");
    setNearbyAttractions("");
    setNearbyRestaurants("");
    setPublicTransport("");
    setImportantLandmarks("");

    setHostNotes("");
    setFormError("");
  };

  const toggleAmenity = (value: string) => {
    setAmenities((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleAddProperty = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setFormError("");

    const cleanName = propertyName.trim();
    const cleanCity = city.trim();
    const cleanCountry = country.trim();

    if (!cleanName || !cleanCity || !cleanCountry) {
      setFormError(
        "Property name, city and country are required."
      );
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFormError(
          "Your session has expired. Please sign in again."
        );
        return;
      }

      const { data, error: insertError } = await supabase
        .from("properties")
        .insert({
          user_id: user.id,

          name: cleanName,
          property_type: propertyType,
          address: address.trim() || null,
          city: cleanCity,
          country: cleanCountry,
          description: description.trim() || null,

          bedrooms: bedrooms
            ? Number.parseInt(bedrooms, 10)
            : null,

          bathrooms: bathrooms
            ? Number.parseFloat(bathrooms)
            : null,

          max_guests: maxGuests
            ? Number.parseInt(maxGuests, 10)
            : null,

          bed_configuration:
            bedConfiguration.trim() || null,

          living_room:
            livingRoom.trim() || null,

          kitchen:
            kitchen.trim() || null,

          bathroom_details:
            bathroomDetails.trim() || null,

          amenities,

          check_in_time:
            checkInTime || null,

          check_out_time:
            checkOutTime || null,

          quiet_hours:
            quietHours.trim() || null,

          smoking,
          pets,
          parties,

          access_method:
            accessMethod.trim() || null,

          check_in_instructions:
            checkInInstructions.trim() || null,

          parking_instructions:
            parkingInstructions.trim() || null,

          wifi_network:
            wifiNetwork.trim() || null,

          wifi_password:
            wifiPassword.trim() || null,

          neighborhood:
            neighborhood.trim() || null,

          nearby_attractions:
            nearbyAttractions.trim() || null,

          nearby_restaurants:
            nearbyRestaurants.trim() || null,

          public_transport:
            publicTransport.trim() || null,

          important_landmarks:
            importantLandmarks.trim() || null,

          host_notes:
            hostNotes.trim() || null,

          status: "active",
        })
        .select(
          `
          id,
          user_id,
          name,
          city,
          country,
          address,
          listing_url,
          status,
          property_type,
          description,
          bedrooms,
          bathrooms,
          max_guests,
          bed_configuration,
          living_room,
          kitchen,
          bathroom_details,
          amenities,
          check_in_time,
          check_out_time,
          quiet_hours,
          smoking,
          pets,
          parties,
          access_method,
          check_in_instructions,
          parking_instructions,
          wifi_network,
          wifi_password,
          neighborhood,
          nearby_attractions,
          nearby_restaurants,
          public_transport,
          important_landmarks,
          host_notes
          `
        )
        .single();

      if (insertError) {
        throw insertError;
      }

      if (data) {
        onPropertiesChange([data as Property, ...properties]);
      }

      resetForm();
      setShowForm(false);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Unable to save property."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <PanelTitle
          title="My Properties"
          sub="Listings connected to your Webrya account."
        />

        <Button
          type="button"
          onClick={() => {
            setFormError("");
            setShowForm((value) => !value);
          }}
        >
          <Plus className="size-4" />
          Add Property
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddProperty}
          className="space-y-8"
        >
          {/* BASIC INFORMATION */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div>
              <p className="eyebrow">Basic information</p>

              <h2 className="mt-2 text-xl">
                Tell us about your property
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Only the name, city and country are required.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Property name *"
                htmlFor="property-name"
                className="sm:col-span-2"
              >
                <input
                  id="property-name"
                  value={propertyName}
                  onChange={(e) =>
                    setPropertyName(e.target.value)
                  }
                  placeholder="e.g. Casa Olivia"
                  required
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Property type"
                htmlFor="property-type"
              >
                <select
                  id="property-type"
                  value={propertyType}
                  onChange={(e) =>
                    setPropertyType(e.target.value)
                  }
                  disabled={saving}
                  className={inputClass}
                >
                  {propertyTypes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Address" htmlFor="property-address">
                <input
                  id="property-address"
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="Street and number"
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field label="City *" htmlFor="property-city">
                <input
                  id="property-city"
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  placeholder="Athens"
                  required
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field label="Country *" htmlFor="property-country">
                <input
                  id="property-country"
                  value={country}
                  onChange={(e) =>
                    setCountry(e.target.value)
                  }
                  placeholder="Greece"
                  required
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Description"
                htmlFor="property-description"
                className="sm:col-span-2"
              >
                <textarea
                  id="property-description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={4}
                  placeholder="Describe the property..."
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field label="Bedrooms" htmlFor="property-bedrooms">
                <input
                  id="property-bedrooms"
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) =>
                    setBedrooms(e.target.value)
                  }
                  placeholder="2"
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field label="Bathrooms" htmlFor="property-bathrooms">
                <input
                  id="property-bathrooms"
                  type="number"
                  min="0"
                  step="0.5"
                  value={bathrooms}
                  onChange={(e) =>
                    setBathrooms(e.target.value)
                  }
                  placeholder="1.5"
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Maximum guests"
                htmlFor="property-max-guests"
              >
                <input
                  id="property-max-guests"
                  type="number"
                  min="1"
                  value={maxGuests}
                  onChange={(e) =>
                    setMaxGuests(e.target.value)
                  }
                  placeholder="4"
                  disabled={saving}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>

          {/* ACCOMMODATION */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Accommodation</p>

            <div className="mt-6 grid gap-5">
              <Field
                label="Bed configuration"
                htmlFor="bed-configuration"
              >
                <textarea
                  id="bed-configuration"
                  value={bedConfiguration}
                  onChange={(e) =>
                    setBedConfiguration(e.target.value)
                  }
                  rows={3}
                  placeholder="e.g. 1 king bed, 2 single beds"
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field label="Living room" htmlFor="living-room">
                <textarea
                  id="living-room"
                  value={livingRoom}
                  onChange={(e) =>
                    setLivingRoom(e.target.value)
                  }
                  rows={3}
                  placeholder="Describe the living room..."
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field label="Kitchen" htmlFor="kitchen">
                <textarea
                  id="kitchen"
                  value={kitchen}
                  onChange={(e) =>
                    setKitchen(e.target.value)
                  }
                  rows={3}
                  placeholder="Describe the kitchen..."
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field
                label="Bathroom details"
                htmlFor="bathroom-details"
              >
                <textarea
                  id="bathroom-details"
                  value={bathroomDetails}
                  onChange={(e) =>
                    setBathroomDetails(e.target.value)
                  }
                  rows={3}
                  placeholder="Describe the bathrooms..."
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>
            </div>
          </div>

          {/* AMENITIES */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Amenities</p>

            <p className="mt-2 text-sm text-muted-foreground">
              Select everything available at the property.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {amenityOptions.map(([value, label]) => {
                const selected = amenities.includes(value);

                return (
                  <label
                    key={value}
                    className={
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm transition-colors " +
                      (selected
                        ? "border-primary bg-secondary"
                        : "border-border hover:bg-secondary")
                    }
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        toggleAmenity(value)
                      }
                      disabled={saving}
                      className="size-4"
                    />

                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* POLICIES */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Policies</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Check-in time"
                htmlFor="check-in-time"
              >
                <input
                  id="check-in-time"
                  type="time"
                  value={checkInTime}
                  onChange={(e) =>
                    setCheckInTime(e.target.value)
                  }
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Check-out time"
                htmlFor="check-out-time"
              >
                <input
                  id="check-out-time"
                  type="time"
                  value={checkOutTime}
                  onChange={(e) =>
                    setCheckOutTime(e.target.value)
                  }
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Quiet hours"
                htmlFor="quiet-hours"
              >
                <input
                  id="quiet-hours"
                  value={quietHours}
                  onChange={(e) =>
                    setQuietHours(e.target.value)
                  }
                  placeholder="e.g. 23:00 – 08:00"
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <PolicySelect
                label="Smoking"
                value={smoking}
                onChange={setSmoking}
                disabled={saving}
              />

              <PolicySelect
                label="Pets"
                value={pets}
                onChange={setPets}
                disabled={saving}
              />

              <PolicySelect
                label="Parties / events"
                value={parties}
                onChange={setParties}
                disabled={saving}
              />
            </div>
          </div>

          {/* GUEST ACCESS */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Guest access</p>

            <div className="mt-6 grid gap-5">
              <Field
                label="Access method"
                htmlFor="access-method"
              >
                <input
                  id="access-method"
                  value={accessMethod}
                  onChange={(e) =>
                    setAccessMethod(e.target.value)
                  }
                  placeholder="e.g. Self check-in with lockbox"
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Check-in instructions"
                htmlFor="check-in-instructions"
              >
                <textarea
                  id="check-in-instructions"
                  value={checkInInstructions}
                  onChange={(e) =>
                    setCheckInInstructions(e.target.value)
                  }
                  rows={4}
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field
                label="Parking instructions"
                htmlFor="parking-instructions"
              >
                <textarea
                  id="parking-instructions"
                  value={parkingInstructions}
                  onChange={(e) =>
                    setParkingInstructions(e.target.value)
                  }
                  rows={3}
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Wi-Fi network"
                  htmlFor="wifi-network"
                >
                  <input
                    id="wifi-network"
                    value={wifiNetwork}
                    onChange={(e) =>
                      setWifiNetwork(e.target.value)
                    }
                    disabled={saving}
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Wi-Fi password"
                  htmlFor="wifi-password"
                >
                  <input
                    id="wifi-password"
                    type="password"
                    value={wifiPassword}
                    onChange={(e) =>
                      setWifiPassword(e.target.value)
                    }
                    disabled={saving}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="rounded-lg border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
                Access details stay on this device and are only
                shared with the AI for the Welcome Message
                Generator.
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Location</p>

            <div className="mt-6 grid gap-5">
              <Field
                label="Neighborhood"
                htmlFor="neighborhood"
              >
                <input
                  id="neighborhood"
                  value={neighborhood}
                  onChange={(e) =>
                    setNeighborhood(e.target.value)
                  }
                  placeholder="e.g. Koukaki"
                  disabled={saving}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Nearby attractions"
                htmlFor="nearby-attractions"
              >
                <textarea
                  id="nearby-attractions"
                  value={nearbyAttractions}
                  onChange={(e) =>
                    setNearbyAttractions(e.target.value)
                  }
                  rows={3}
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field
                label="Nearby restaurants"
                htmlFor="nearby-restaurants"
              >
                <textarea
                  id="nearby-restaurants"
                  value={nearbyRestaurants}
                  onChange={(e) =>
                    setNearbyRestaurants(e.target.value)
                  }
                  rows={3}
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field
                label="Public transport"
                htmlFor="public-transport"
              >
                <textarea
                  id="public-transport"
                  value={publicTransport}
                  onChange={(e) =>
                    setPublicTransport(e.target.value)
                  }
                  rows={3}
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>

              <Field
                label="Important landmarks"
                htmlFor="important-landmarks"
              >
                <textarea
                  id="important-landmarks"
                  value={importantLandmarks}
                  onChange={(e) =>
                    setImportantLandmarks(e.target.value)
                  }
                  rows={3}
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>
            </div>
          </div>

          {/* HOST NOTES */}
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="eyebrow">Host notes</p>

            <div className="mt-5">
              <Field
                label="Anything else the AI should know"
                htmlFor="host-notes"
              >
                <textarea
                  id="host-notes"
                  value={hostNotes}
                  onChange={(e) =>
                    setHostNotes(e.target.value)
                  }
                  rows={6}
                  placeholder="Anything specific about this property that would help Webrya generate better responses..."
                  disabled={saving}
                  className={textareaClass}
                />
              </Field>
            </div>
          </div>

          {/* ERROR */}
          {formError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {formError}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={saving}>
              {saving ? "Saving property..." : "Save property"}
            </Button>
          </div>
        </form>
      )}

      {loading && (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Loading your properties...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          Unable to load your properties: {error}
        </div>
      )}

      {!loading && !error && !showForm && properties.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <Home className="mx-auto size-8 text-muted-foreground" />

          <h2 className="mt-4 text-lg">
            No properties yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Add your first property to start building your
            Webrya workspace around your rental.
          </p>

          <Button
            type="button"
            className="mt-5"
            onClick={() => setShowForm(true)}
          >
            <Plus className="size-4" />
            Add your first property
          </Button>
        </div>
      )}

      {!loading &&
        !error &&
        !showForm &&
        properties.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {properties.map((property) => {
              const location = [
                property.city,
                property.country,
              ]
                .filter(Boolean)
                .join(" · ");

              return (
                <div
                  key={property.id}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg">
                      {property.name}
                    </h2>

                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                      {property.status === "active"
                        ? "Active"
                        : property.status}
                    </span>
                  </div>

                  {property.property_type && (
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                      {property.property_type}
                    </p>
                  )}

                  {location && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {location}
                    </p>
                  )}

                  {property.address && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {property.address}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
    </>
  );
}