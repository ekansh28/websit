"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Appointment {
  _id: string;
  appointmentId: string;
  name: string;
  contact: string;
  service: string;
  timeSlot: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/admin/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ appointmentId, status }),
      });

      if (response.ok) {
        fetchAppointments(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filterAppointments = (status?: string) => {
    if (!status) return appointments;
    return appointments.filter(apt => apt.status === status);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Salon Admin Dashboard</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterAppointments('pending').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({filterAppointments('approved').length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({filterAppointments('rejected').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AppointmentList
            appointments={appointments}
            onStatusUpdate={handleStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="pending">
          <AppointmentList
            appointments={filterAppointments('pending')}
            onStatusUpdate={handleStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="approved">
          <AppointmentList
            appointments={filterAppointments('approved')}
            onStatusUpdate={handleStatusUpdate}
          />
        </TabsContent>

        <TabsContent value="rejected">
          <AppointmentList
            appointments={filterAppointments('rejected')}
            onStatusUpdate={handleStatusUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AppointmentList({
  appointments,
  onStatusUpdate,
}: {
  appointments: Appointment[];
  onStatusUpdate: (appointmentId: string, status: 'approved' | 'rejected') => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No appointments found.
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      {appointments.map((appointment) => (
        <Card key={appointment.appointmentId}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{appointment.name}</CardTitle>
              <Badge className={getStatusColor(appointment.status)}>
                {appointment.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Contact:</strong> {appointment.contact}</p>
                <p><strong>Service:</strong> {appointment.service}</p>
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.timeSlot}</p>
              </div>
              <div>
                <p><strong>Booking ID:</strong> {appointment.appointmentId}</p>
                <p><strong>Created:</strong> {new Date(appointment.createdAt).toLocaleString()}</p>

                {appointment.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => onStatusUpdate(appointment.appointmentId, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => onStatusUpdate(appointment.appointmentId, 'rejected')}
                      variant="destructive"
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}